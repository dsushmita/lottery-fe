'use client';
import { useForm } from 'react-hook-form';
import {
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, GitHub, Twitter } from '@mui/icons-material';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import { StyledTextField, SocialButton, PrimaryButton } from '@/styles/authStyles';
import { LoginFormData } from '@/types/auth/auth';
import { useLogin } from '@/hooks/login/useLogin';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function LoginForm() {
  const { 
    login, 
    loginWithProvider, 
    loading, 
    error, 
    showPassword, 
    togglePasswordVisibility,
    clearError 
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = (data: LoginFormData) => {
    clearError();
    login(data);
  };

  const handleSocialLogin = (provider: 'twitter' | 'discord') => {
    clearError();
    loginWithProvider(provider);
  };

  return ( 
    <AuthLayout>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
        Login to your account
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don't have an account yet?
        </Typography>
        <Typography
          component={Link}
          href="/register"
          variant="body2"
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Create Account
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter a valid email',
            },
          })}
          fullWidth
          label="Username or Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={loading}
        />

        <StyledTextField
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  sx={{ color: 'text.secondary' }}
                  disabled={loading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('rememberMe')}
                checked={rememberMe}
                onChange={(e) => setValue('rememberMe', e.target.checked)}
                disabled={loading}
                sx={{ color: 'text.secondary', '&.Mui-checked': { color: 'primary.main' } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Remember me
              </Typography>
            }
          />

          <Typography
            component={Link}
            href="/forget-password"
            variant="body2"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Forgot Password?
          </Typography>
        </Box>

        <PrimaryButton
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mb: 3 }}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </PrimaryButton>
      </form>

      <Divider sx={{ mb: 3, bgcolor: 'divider' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
          Or
        </Typography>
      </Divider>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <GoogleLoginButton disabled={loading} />
        
        <SocialButton 
          onClick={() => handleSocialLogin('twitter')} 
          disabled={loading}
        >
          <Twitter />
        </SocialButton>
        
        <SocialButton 
          onClick={() => handleSocialLogin('discord')} 
          disabled={loading}
        >
          <GitHub />
        </SocialButton>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <GoogleLoginButton variant="button" disabled={loading} />
      </Box>
    </AuthLayout>
  ); 
}