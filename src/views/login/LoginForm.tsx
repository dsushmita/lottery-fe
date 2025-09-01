// components/LoginForm/LoginForm.tsx
import { useState } from 'react';
import {
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  Box,
  Link,
  IconButton,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Twitter as TwitterIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { SiDiscord } from 'react-icons/si';
import { useForm, Controller } from 'react-hook-form';

import {
  AuthContainer,
  FormContainer,
  LeftPanel,
  RightPanel,
  LogoContainer,
  StyledTextField,
  SocialButton
} from '@/styles/AuthFormStyle';
import { LoginFormData } from '@/types/auth/auth';
import { useLogin } from '@/hooks/login/useLogin';
import logoImage from "../../../public/image/companylogo.png";
import Image from 'next/image';


interface LoginFormProps {
  onCreateAccount?: () => void;
  onForgotPassword?: () => void;
}

const LoginForm = ({
  onCreateAccount,
  onForgotPassword,
}: LoginFormProps) => {
  const {
    login,
    loginWithProvider,
    togglePasswordVisibility,
    clearError,
    loading,
    error,
    showPassword
  } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  const watchedFields = watch();
  const isFormValid = watchedFields.email &&
    watchedFields.password &&
    !errors.email &&
    !errors.password;

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  const handleFormChange = () => {
    if (error) clearError();
  };

  // Pure React Hook Form validation functions
  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Enter a valid email address';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return true;
  };

  return (
    <AuthContainer>
      <FormContainer elevation={0}>
        {/* Left Panel */}
        <LeftPanel>
          {/* Top - COP THEM text */}
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              color="white"
              sx={{ letterSpacing: 2 }}
            >
              COP THEM
            </Typography>
          </Box>

          {/* Bottom - Logo Image */}
          <LogoContainer>
            <Image src={logoImage} alt="Logo" />
          </LogoContainer>
        </LeftPanel>
        {/* Right Panel */}
        <RightPanel>
          <Typography
            variant="h4"
            component="h2"
            color="white"
            fontWeight="600"
            sx={{ mb: 1 }}
          >
            Login to your account
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}
          >
            Don't have an account yet?{' '}
            <Link
              component="button"
              type="button"
              onClick={onCreateAccount}
              sx={{
                color: '#6366f1',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Create Account
            </Link>
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: '#f44336',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                '& .MuiAlert-icon': { color: '#f44336' }
              }}
            >
              {error.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
            <Controller
              name="email"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Username or Email"
                  type="email"
                  autoComplete="email"
                  disabled={loading}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFormChange();
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ validate: validatePassword }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  disabled={loading}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFormChange();
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        disabled={loading}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-checked': { color: '#6366f1' },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                        Remember me
                      </Typography>
                    }
                  />
                )}
              />
              <Link
                component="button"
                type="button"
                onClick={onForgotPassword}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  '&:hover': {
                    color: '#6366f1',
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !isFormValid}
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(to right, #3749FF, #5B64FF)',
                color:"white",
                // background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5b21b6 30%, #7c3aed 90%)',
                    color:"white",
                },
                // '&:disabled': {
                //   background: 'rgba(255, 255, 255, 0.1)',
                //   color: 'rgba(255, 255, 255, 0.5)',
                // },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
            </Button>
          </Box>

          <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', px: 2 }}>
              Or
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <SocialButton
              onClick={() => loginWithProvider('google')}
              disabled={loading}
            >
              <GoogleIcon />
            </SocialButton>

            <SocialButton
              onClick={() => loginWithProvider('twitter')}
              disabled={loading}
            >
              <TwitterIcon />
            </SocialButton>

            <SocialButton
              onClick={() => loginWithProvider('discord')}
              disabled={loading}
            >
              <SiDiscord size={24} />
            </SocialButton>
          </Box>
        </RightPanel>
      </FormContainer>
    </AuthContainer>
  );
};

export default LoginForm;