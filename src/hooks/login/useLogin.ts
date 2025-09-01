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
      console.log("response", response)
      
      if (response.success && response.user) {
        router.push('/dashboard');
        //  setUser(response.user);
      } else {
        setError({ message: response.message || 'Login failed' });
      }
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'An unexpected error occurred' 
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'google' | 'twitter' | 'discord') => {
    setLoading(true);
    setError(null);

    try {
      let response;
      switch (provider) {
        case 'google':
          response = await authService.loginWithGoogle();
          break;
        case 'twitter':
          response = await authService.loginWithTwitter();
          break;
        case 'discord':
          response = await authService.loginWithDiscord();
          break;
        default:
          throw new Error('Unsupported provider');
      }

      if (response.success) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'Social login failed' 
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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