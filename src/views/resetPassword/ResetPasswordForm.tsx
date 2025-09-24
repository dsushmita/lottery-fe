'use client';

import type { FC } from 'react';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { Lock, CheckCircle } from '@mui/icons-material';
import Link from 'next/link';

import { useResetPassword } from '@/hooks/login/useResetPassword';
import AuthLayout from '@/components/AuthLayout';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { PrimaryButton } from '@/styles/authStyles';

const ResetPasswordForm: FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    success,
    password,
    token,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    clearError,
    goToLogin,
  } = useResetPassword();

  // Success State
  if (success) {
    return (
      <AuthLayout>
        <Box sx={{ textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: '#6366f1', mb: 2 }} />
          
          <AuthHeader
            title="Password Changed Successfully!"
            variant="reset-password"
            description="Your password has been changed successfully. You will be redirected to the login page in a few seconds."
          />

          <PrimaryButton 
            onClick={goToLogin} 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, px: 4 }}
          >
            Login Now
          </PrimaryButton>
        </Box>
      </AuthLayout>
    );
  }

  // Invalid Token State
  if (!token) {
    return (
      <AuthLayout>
        <Box sx={{ textAlign: 'center' }}>
          <AuthHeader
            title="Invalid Reset Link"
            variant="reset-password"
            description="This password reset link is invalid or has expired."
          />

          <Link href="/forgot-password" passHref>
            <PrimaryButton 
              variant="contained" 
              size="large" 
              sx={{ py: 1.5, px: 4 }}
            >
              Request New Link
            </PrimaryButton>
          </Link>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Your Password"
        variant="reset-password"
        description="Create a new password for your account."
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <AuthTextField
          name="password"
          label="New Password"
          type="password"
          register={register}
          error={errors.password}
          disabled={loading}
          startIcon={<Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          validation={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          }}
          variant="reset-password"
        />
        <AuthTextField
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          disabled={loading}
          startIcon={<Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          validation={{
            required: 'Please confirm your password',
            validate: (value: string) => value === password || 'Passwords do not match',
          }}
          variant="reset-password"
        />
        <PrimaryButton
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mb: 2, py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Reset Password'}
        </PrimaryButton>
        <Link href="/login" passHref>
          <Button 
            fullWidth 
            variant="text" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              '&:hover': { color: 'white' } 
            }}
          >
            Back to Login
          </Button>
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default ResetPasswordForm;