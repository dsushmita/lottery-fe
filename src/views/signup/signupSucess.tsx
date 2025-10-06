import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { PrimaryButton } from "@/styles/authStyles";

export default function SignupSuccessPage() {
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
  return (
    <AuthLayout>
      <Box sx={{ textAlign: "center" }}>
        <IconCheck />

        {/* Header */}
        <AuthHeader
          title={"Account Created\nSuccessfully!"}
          description="You have created account successfully, please login to join in the community."
        />

        {/* Login Button */}
        <PrimaryButton fullWidth href="/login">
          Login Now
        </PrimaryButton>
      </Box>
    </AuthLayout>
  );
}
