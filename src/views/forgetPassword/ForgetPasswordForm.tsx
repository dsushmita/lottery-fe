'use client';
import { Alert, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useForgotPassword } from '@/hooks/login/useForgotPassword';
import AuthLayout from '@/components/AuthLayout';
import { PrimaryButton } from '@/styles/authStyles';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { AuthHeader } from '@/components/auth/AuthHeader';

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    emailSent,
    resendEmail,
    clearError,
  } = useForgotPassword();
  if (emailSent) {
    return (
      <AuthLayout>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <Typography sx={{ fontSize: '2rem', color: 'white' }}>✓</Typography>
          </Box>
          <AuthHeader
            title="Email Sent!"
            variant="forgot-password"
            description="Check your email and open the link to continue. The email may take a few minutes to arrive."
          />
          <PrimaryButton
            onClick={resendEmail}
            disabled={loading}
            variant="outlined"
            sx={{ 
              mb: 2,
              borderColor: '#6366f1',
              color: '#6366f1',
              '&:hover': {
                borderColor: '#5855eb',
                bgcolor: 'rgba(99, 102, 241, 0.1)'
              }
            }}
          >
            {loading ? 'Sending...' : 'Resend Email'}
          </PrimaryButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Don't have an account yet?
            </Typography>
            <Typography
              component={Link}
              href="/register"
              variant="body2"
              sx={{
                color: '#6366f1',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Create Account
            </Typography>
          </Box>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Forgot Password?"
        variant="forgot-password"
        description="Enter your email and we'll send you a link to reset your password."
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <AuthTextField
          name="email"
          placeholder="example@domain.com"
          label="Enter your email address"
          register={register}
          error={errors.email}
          disabled={loading}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email',
            },
          }}
          variant="forgot-password"
        />
        <PrimaryButton
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mb: 3 }}
        >
          {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </PrimaryButton>
      </form>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Remember your password?
        </Typography>
        <Typography
          component={Link}
          href="/login"
          variant="body2"
          sx={{
            color: '#6366f1',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Back to Login
        </Typography>
      </Box>
    </AuthLayout>
  );
}