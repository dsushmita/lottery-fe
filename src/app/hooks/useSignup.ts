'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse, SignupCredentials } from '../types/auth';
import apiClient from '../utils/apiClient';


export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateCredentials = ({ email, password, username }: SignupCredentials) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    if (!username || username.length < 3) return 'Username must be at least 3 characters';
    return null;
  };

  const signup = async (credentials: SignupCredentials) => {
    setLoading(true);
    setError(null);

    const validationError = validateCredentials(credentials);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post<AuthResponse>('/signup', credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Try a different email or username.');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};