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

// Assuming your SignupFormData interface (keeping your existing types)
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

  const handleSocialLogin = (provider: "google" | "twitter" | "discord") => {
    clearError();
    signupWithProvider(provider);
  };

  return (
    <AuthLayout>
      <Box sx={{ width: "100%", maxWidth: 400 }}>
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

          <FormControlLabel
            control={
              <Checkbox
                {...register("acceptTerms", {
                  required: "You must accept the terms",
                })}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-checked": { color: "#0ea5e9" },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                I am 18+ and have read and accept the{" "}
                <Link
                  href="/terms"
                  style={{ color: "#0ea5e9", textDecoration: "none" }}
                >
                  Terms and Conditions
                </Link>
                .
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mb: 3,
              py: 1.5,
              backgroundColor: "#0ea5e9",
              "&:hover": { backgroundColor: "#0284c7" },
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <SocialLoginSection
          onSocialLogin={handleSocialLogin}
          disabled={loading}
          variant="login"
          showGoogle={true}
          showTwitter={true}
          showDiscord={true}
        />
      </Box>
    </AuthLayout>
  );
};

export default SignupForm;
