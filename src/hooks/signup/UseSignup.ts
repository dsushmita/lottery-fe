// hooks/signup/useSignup.ts

"use client";

import { useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignupResponse } from '@/types/auth/signup';
import { AuthContext } from '@/context/AuthContext';
import { User } from '@/types/auth/login';
import { SignupService } from '@/services/signUpService';

interface UseSignupReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  handleSignup: (credentials: { userName: string; email: string; password: string }) => Promise<void>;
}

export const useSignup = (): UseSignupReturn => {
  const { user, setUser } = useContext(AuthContext) as { 
    user: User | null; 
    setUser: React.Dispatch<React.SetStateAction<User | null>> 
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignup = async (credentials: { userName: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting signup process...');
      const data = await SignupService(credentials);
      
      // Convert signup response user to User type
      const userData: User = {
        id: data.user.id,
        userName: data.user.userName,
        email: data.user.email,
        name: data.user.name,
        createdAt: data.user.createdAt
      };
      
      // Set user data and token
      setUser(userData);
      localStorage.setItem('token', data.token);
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Signup successful, redirecting...');
      
      // Get redirect URL from search params or default to dashboard
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleSignup };
};