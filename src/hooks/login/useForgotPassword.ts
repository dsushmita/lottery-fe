import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthError, ForgotPasswordData } from '@/types/auth/auth';
import { authService } from '@/services/authService';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordData>();

  const sendResetEmail = async (data: ForgotPasswordData) => {
    setLoading(true);
    setError(null);

    try {
      // Your service returns void, so just call it
      await authService.forgotPassword(data);
      
      // If no error thrown, assume success
      setEmailSent(true);
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'Failed to send reset email' 
      });
    } finally {
      setLoading(false);
    }
  };

  const resendEmail = async () => {
    const email = getValues('email');
    if (email) {
      await sendResetEmail({ email });
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    handleSubmit: handleSubmit(sendResetEmail),
    errors,
    loading,
    error,
    emailSent,
    resendEmail,
    clearError,
  };
};