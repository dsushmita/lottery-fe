import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthError, ResetPasswordData } from '@/types/auth/auth';
import { authService } from '@/services/authService';

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Omit<ResetPasswordData, 'token' | 'userId'>>();

  const password = watch('password');

  const resetPassword = async (data: Omit<ResetPasswordData, 'token' | 'userId'>) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        setError({ message: 'Invalid reset token' });
        return;
      }

      if (!userId) {
        setError({ message: 'User ID parameter missing from reset link' });
        return;
      }

      if (data.password !== data.confirmPassword) {
        setError({ message: 'Passwords do not match' });
        return;
      }

      // Call service with email from URL
      await authService.resetPassword({
        password: data.password,
        token: token,
        userId: userId,
      });

      // If we reach here without error, the reset was successful
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'Failed to reset password' 
      });
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const goToLogin = () => router.push('/login');

  return {
    register,
    handleSubmit: handleSubmit(resetPassword),
    errors,
    loading,
    error,
    success,
    password,
    token,
    userId,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    clearError,
    goToLogin,
  };
};
