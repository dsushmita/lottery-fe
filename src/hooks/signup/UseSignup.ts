import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthError } from '@/types/auth/auth';
import { authService } from '@/services/authService';

interface SignupFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const signup = async (formData: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.signup({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      
      if (response.token) {
        router.push('/dashboard');
      } else {
        setError({ message: 'Signup failed' });
      }
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'An unexpected error occurred' 
      });
    } finally {
      setLoading(false);
    }
  };

  const signupWithProvider = async (provider: 'google' | 'steam' ) => {
    setLoading(true);
    setError(null);

    try {
      // Handle social signup (if your service supports it)
      console.log(`Signup with ${provider}`);
      // Add your social signup logic here
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'Social signup failed' 
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    signup,
    signupWithProvider,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    clearError,
    loading,
    error,
    showPassword,
    showConfirmPassword,
  };
};
