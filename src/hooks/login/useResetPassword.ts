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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Omit<ResetPasswordData, 'token'>>();

  const password = watch('password');

  const resetPassword = async (data: Omit<ResetPasswordData, 'token'>) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        setError({ message: 'Invalid reset token' });
        return;
      }
      
      await authService.resetPassword({
        password: data.password,
        token,
      });
      setSuccess(true);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to reset password'
      });
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/login');
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
    register,
    handleSubmit: handleSubmit(resetPassword),
    errors,
    loading,
    error,
    success,
    password,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    goToLogin,
    clearError,
  };
};