'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse, LoginCredentials } from '../types/auth';
import apiClient from '../utils/apiClient';


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateCredentials = ({ email, password }: LoginCredentials) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    const validationError = validateCredentials(credentials);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post<AuthResponse>('/login', credentials);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};