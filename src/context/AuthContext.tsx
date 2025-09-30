// context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback, useRef } from 'react';
import { User } from '@/types/auth/auth';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: string | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const steamCallbackProcessed = useRef(false);

  const initializeAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      const storedUser = authService.getStoredUser();
      if (storedUser && authService.isAuthenticated()) {
        setUser(storedUser);

        try {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.warn('Failed to verify user session:', error);
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
    }
  }, [router]);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const handleSteamCallback = useCallback(async (params: URLSearchParams) => {
    // Prevent multiple executions
    if (steamCallbackProcessed.current) {
      console.log('Steam callback already processed, skipping');
      return;
    }

    steamCallbackProcessed.current = true;
    console.log('Steam callback initiated');
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log('OpenID params:', Object.fromEntries(params.entries()));
      
      const response = await authService.loginWithSteam(params);
      console.log('Steam login response:', response);
      
      if (response.success && response.user) {
        setUser(response.user);
        
        // Clean up URL parameters
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        const errorMsg = response.message || 'Steam login failed';
        setAuthError(errorMsg);
        console.error('Steam login failed:', errorMsg);
        
        // Clean URL and redirect back to login with error
        const cleanUrl = window.location.origin + '/login';
        window.history.replaceState({}, document.title, cleanUrl);
        router.push('/login');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Steam authentication failed';
      console.error('Steam callback error:', err);
      setAuthError(errorMsg);
      
      // Clean URL and redirect to login
      const cleanUrl = window.location.origin + '/login';
      window.history.replaceState({}, document.title, cleanUrl);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Handle Steam callback - runs only once on mount
  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    
    // Check if this is a Steam callback
    if (params.get('openid.mode') === 'id_res') {
      console.log('Steam callback detected');
      handleSteamCallback(params);
    } else {
      // Only initialize auth if not a Steam callback
      initializeAuth();
    }
  }, []); // Empty dependency array - runs once on mount

  const value: AuthContextType = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: !!user,
    authError,
    setUser,
    refreshUser,
    logout,
    clearAuthError,
  }), [user, isLoading, authError, refreshUser, logout, clearAuthError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};