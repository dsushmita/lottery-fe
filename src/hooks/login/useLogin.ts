// hooks/login/useLogin.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { AuthError, LoginFormData } from '@/types/auth/auth';
import { useAuth } from '@/context/AuthContext';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const login = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(formData);
      console.log('response', response);

      if (response.success && response.user) {
        setUser(response.user);
        router.push('/dashboard');
      } else {
        setError({ message: response.message || 'Login failed' });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'google' | 'steam' | 'discord') => {
    setError(null);

    try {
      switch (provider) {
        case 'steam':
          setLoading(true);
          try {
            const steamUrl = await authService.getSteamLoginUrl();
            // The redirect will happen, and the AuthContext will handle the callback
            window.location.href = steamUrl;
          } catch (err) {
            setLoading(false);
            setError({
              message: err instanceof Error ? err.message : 'Failed to initiate Steam login',
            });
          }
          // Don't set loading to false here - let the page redirect
          return;

        case 'discord':
          setLoading(true);
          const discordResponse = await authService.loginWithDiscord();
          if (discordResponse.success && discordResponse.user) {
            setUser(discordResponse.user);
            router.push('/dashboard');
          } else {
            setError({ message: discordResponse.message || 'Discord login failed' });
          }
          setLoading(false);
          break;

        case 'google':
          setLoading(true);
          // You'll need to implement proper Google OAuth flow
          // This is a placeholder - replace with actual Google OAuth implementation
          const googleResponse = await authService.loginWithGoogle(''); 
          if (googleResponse.success && googleResponse.user) {
            setUser(googleResponse.user);
            router.push('/dashboard');
          } else {
            setError({ message: googleResponse.message || 'Google login failed' });
          }
          setLoading(false);
          break;

        default:
          throw new Error('Unsupported provider');
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Social login failed',
      });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    login,
    loginWithProvider,
    togglePasswordVisibility,
    clearError,
    loading,
    error,
    showPassword,
  };
};