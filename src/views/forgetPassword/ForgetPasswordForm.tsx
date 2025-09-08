'use client';
import { Typography, Button, Alert, Box } from '@mui/material';
import Link from 'next/link';
import { useForgotPassword } from '@/hooks/login/useForgotPassword';
import AuthLayout from '@/components/AuthLayout';
import { StyledTextField } from '@/styles/authStyles';

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

          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
            Email Sent!
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
            Check your email and open the link to continue. The email may take a few minutes to arrive.
          </Typography>

          <Button
            onClick={resendEmail}
            disabled={loading}
            variant="outlined"
            sx={{ 
              mb: 2, 
              color: '#6366f1',
              borderColor: '#6366f1',
              '&:hover': {
                borderColor: '#5855eb',
                bgcolor: 'rgba(99, 102, 241, 0.1)'
              }
            }}
          >
            {loading ? 'Sending...' : 'Resend Email'}
          </Button>

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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
        Forgot Password?
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
        Enter your email and we'll send you a link to reset your password.
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }} 
          onClose={clearError}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={clearError}
              sx={{ color: 'white' }}
            >
              ✕
            </Button>
          }
        >
          {error.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <StyledTextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email',
            },
          })}
          fullWidth
          label="Enter your email address"
          placeholder="example@domain.com"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={loading}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            mb: 3,
            bgcolor: '#6366f1',
            '&:hover': { bgcolor: '#5855eb' },
            '&:disabled': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>
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