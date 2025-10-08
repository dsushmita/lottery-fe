'use client';
import { Alert, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useForgotPassword } from '@/hooks/login/useForgotPassword';
import AuthLayout from '@/components/AuthLayout';
import { PrimaryButton } from '@/styles/authStyles';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { AuthHeader } from '@/components/auth/AuthHeader';

export default function ForgotPasswordForm() {
    const IconCheck = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46 24L41.12 18.44L41.8 11.08L34.58 9.44L30.8 3.08L24 6L17.2 3.08L13.42 9.44L6.2 11.06L6.88 18.42L2 24L6.88 29.56L6.2 36.94L13.42 38.58L17.2 44.94L24 42L30.8 44.92L34.58 38.56L41.8 36.92L41.12 29.56L46 24ZM20 34L12 26L14.82 23.18L20 28.34L33.18 15.16L36 18L20 34Z"
        fill="#3ABEF9"
      />
    </svg>
  );
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
          <IconCheck />
          <AuthHeader
            title="Email Sent!"
            variant="forgot-password"
            description={"Check your email and open the link to\ncontinue."}
          />
        
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Do&apos;nt have an account yet?
            </Typography>
            <Typography
              component={Link}
              href="/register"
              variant="body2"
              sx={{
                color: '#3ABEF9',
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
    Don’t have an account yet? 
        </Typography>
        <Typography
          component={Link}
          href="/register"
          variant="body2"
          sx={{
            color: '#3ABEF9',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Create Account
        </Typography>
      </Box>
    </AuthLayout>
  );
}