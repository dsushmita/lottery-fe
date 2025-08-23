"use client";

import { useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthResponse, User } from '@/types/auth/login';
import { AuthContext } from '@/context/AuthContext';
import { LoginService } from '@/services/loginService';

interface UseLoginReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  handleLogin: (credentials: { username: string; password: string }) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const { user, setUser } = useContext(AuthContext) as { 
    user: User | null; 
    setUser: React.Dispatch<React.SetStateAction<User | null>> 
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting login process...');
      const data = await LoginService(credentials);
      
      // Set user data and token
      setUser(data.user);
      localStorage.setItem('token', data.token);
      
      // Optional: Store user data in localStorage as well for persistence
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('Login successful, redirecting...');
      
      // Get redirect URL from search params or default to dashboard
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleLogin };
};