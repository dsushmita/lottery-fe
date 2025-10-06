import React from "react";
import {
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import { Person, Email, Lock } from "@mui/icons-material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSignup } from "@/hooks/signup/UseSignup";
import AuthLayout from "@/components/AuthLayout";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { SocialLoginSection } from "@/components/auth/SocialLoginButtons";
import { PrimaryButton } from "@/styles/authStyles";
interface SignupFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const SignupForm: React.FC = () => {
  const {
    signup,
    signupWithProvider,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    clearError,
    loading,
    error,
    showPassword,
    showConfirmPassword,
  } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    if (!data.acceptTerms) {
      return;
    }
    await signup(data);
  };

  const handleSocialLogin = (provider: "google" | "steam") => {
    clearError();
    signupWithProvider(provider);
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Create your account"
        subtitle="Already have an account?"
        linkText="Login here"
        linkHref="/login"
        variant="signup"
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          name="userName"
          // label="Username"
          placeholder="Username"
          register={register}
          error={errors.userName}
          disabled={loading}
          // startIcon={<Person sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
          validation={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          }}
          variant="signup"
        />

        <AuthTextField
          name="email"
          // label="Email Address"
          placeholder="Email Address"
          type="email"
          register={register}
          error={errors.email}
          disabled={loading}
          // startIcon={<Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          variant="signup"
        />

        <AuthTextField
          name="password"
          // label="Password"
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password}
          disabled={loading}
          // startIcon={<Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          variant="signup"
        />

        <AuthTextField
          name="confirmPassword"
          // label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          disabled={loading}
          // startIcon={<Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
          showPassword={showConfirmPassword}
          onTogglePassword={toggleConfirmPasswordVisibility}
          validation={{
            required: "Please confirm your password",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
          variant="signup"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...register("acceptTerms", {
                  required: "You must accept the terms",
                })}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Remember me
              </Typography>
            }
          />

          <Typography
            component={Link}
            href="/forget-password"
            variant="body2"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
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
          {loading ? "signing in..." : "Create Account"}
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
};

export default SignupForm;
