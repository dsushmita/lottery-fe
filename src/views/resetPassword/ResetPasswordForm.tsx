'use client';

import type { FC } from 'react';
import {
  Typography,
  Button,
  Alert,
  InputAdornment,
  Box,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Lock, Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';
import Link from 'next/link';

import { StyledTextField } from '@/styles/authStyles';
import { useResetPassword } from '@/hooks/login/useResetPassword';
import AuthLayout from '@/components/AuthLayout';

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

  if (success) {
    return (
      <AuthLayout>
        <Box sx={{ textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: '#6366f1', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
            Password Changed Successfully!
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
            Your password has been changed successfully. You will be redirected to the login page in a few seconds.
          </Typography>

          <Button onClick={goToLogin} variant="contained" size="large" sx={{ backgroundColor: '#6366f1', '&:hover': { backgroundColor: '#5855eb' }, py: 1.5, px: 4 }}>
            Login Now
          </Button>
        </Box>
      </AuthLayout>
    );
  }

  if (!token) {
    return (
      <AuthLayout>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
            Invalid Reset Link
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
            This password reset link is invalid or has expired.
          </Typography>

          <Button component={Link} href="/forgot-password" variant="contained" size="large" sx={{ backgroundColor: '#6366f1', '&:hover': { backgroundColor: '#5855eb' }, py: 1.5, px: 4 }}>
            Request New Link
          </Button>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
        Reset Your Password
      </Typography>

      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', mb: 4 }}>
        Create a new password for your account.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <StyledTextField
          fullWidth
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mb: 2, py: 1.5, backgroundColor: '#6366f1', '&:hover': { backgroundColor: '#5855eb' } }}>
          {loading ? <CircularProgress size={24} /> : 'Reset Password'}
        </Button>

        <Button component={Link} href="/login" fullWidth variant="text" sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'white' } }}>
          Back to Login
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default ResetPasswordForm;
