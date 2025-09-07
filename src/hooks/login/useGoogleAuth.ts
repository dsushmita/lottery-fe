import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { AuthError } from '@/types/auth/auth';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleGoogleResponse = useCallback(async (response: CredentialResponse) => {
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await authService.loginWithGoogle(response.credential);
      
      if (loginResponse.success && loginResponse.user) {
        setUser(loginResponse.user);
        router.push('/dashboard');
      } else {
        setError({ message: loginResponse.message || 'Google login failed' });
      }
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'Google login failed' 
      });
    } finally {
      setLoading(false);
    }
  }, [setUser, router]);

  const initializeGoogleAuth = useCallback(() => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }, [handleGoogleResponse]);

  const signInWithGoogle = useCallback(() => {
    setError(null);
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log('Google One Tap not displayed:', notification.getNotDisplayedReason());
        }
      });
    }
  }, []);

  const renderGoogleButton = useCallback((elementId: string) => {
    if (typeof window !== 'undefined' && window.google) {
      const element = document.getElementById(elementId);
      if (element) {
        window.google.accounts.id.renderButton(element, {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: '280',
        });
      }
    }
  }, []);

  return {
    loading,
    error,
    initializeGoogleAuth,
    signInWithGoogle,
    renderGoogleButton,
    clearError: () => setError(null),
  };
};