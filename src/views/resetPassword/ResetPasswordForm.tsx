"use client";

import type { FC } from "react";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { Lock, CheckCircle } from "@mui/icons-material";
import Link from "next/link";

import { useResetPassword } from "@/hooks/login/useResetPassword";
import AuthLayout from "@/components/AuthLayout";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { PrimaryButton } from "@/styles/authStyles";

const ResetPasswordForm: FC = () => {
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
        <Box sx={{ textAlign: "center" }}>
          <IconCheck />
          <AuthHeader
            title="Password Changed Successfully!"
            variant="reset-password"
            description={
              "Your password has been changed successfully.\nPlease login again."
            }
          />

          {/* Login Button */}
          <PrimaryButton fullWidth href="/login">
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
        <Box sx={{ textAlign: "center" }}>
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

      <Box component="form" onSubmit={handleSubmit}>
        <AuthTextField
          name="password"
          placeholder="New Password"
          type="password"
          register={register}
          error={errors.password}
          disabled={loading}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          validation={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          variant="reset-password"
        />
        <AuthTextField
          name="confirmPassword"
          placeholder="Confirm New Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          disabled={loading}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          validation={{
            required: "Please confirm your password",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
          variant="reset-password"
        />
        <PrimaryButton
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mb: 2, py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </PrimaryButton>
      </Box>
    </AuthLayout>
  );
};

export default ResetPasswordForm;
