import { useForm } from 'react-hook-form';
import {
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  Box,
} from '@mui/material';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import { PrimaryButton } from '@/styles/authStyles';
import { LoginFormData } from '@/types/auth/auth';
import { useLogin } from '@/hooks/login/useLogin';
import { AuthTextField } from '@/components/auth/AuthTextField';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { SocialLoginSection } from '@/components/auth/SocialLoginButtons';

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

  const handleSocialLogin = (provider: 'google' | 'steam' | 'discord') => {
    clearError();
    loginWithProvider(provider);
  };

  return ( 
    <AuthLayout>
      <AuthHeader
        title="Login to your account"
        subtitle="Don't have an account yet?"
        linkText="Create Account"
        linkHref="/register"
        variant="login"
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          name="email"
          placeholder="Username or Email"
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
          variant="login"
        />

        <AuthTextField
          name="password"
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password}
          disabled={loading}
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          variant="login"
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
            href="/forgot-password"
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

      <SocialLoginSection
        onSocialLogin={handleSocialLogin}
        disabled={loading}
        variant="login"
        showGoogle={true}
        showSteam={true}
        showDiscord={true}
      />
    </AuthLayout>
  ); 
}