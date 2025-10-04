"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Routes that don't require authentication
  const publicRoutes = [
    "/login",
    "/register",
    "/signup-sucess",
    "/forget-password",
    "/reset-password",
    "/auth/steam/callback",
  ];

  // Routes that require authentication but are not redirected to dashboard
  const authRoutes = [
    "/signup-sucess",
    "/verify-email",
    "/welcome",
    "/auth/steam/callback",
  ];

  // Routes that should redirect to dashboard if user is already authenticated
  const redirectToLoginRoutes = ["/login", "/register"];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const shouldRedirectToDashboard = redirectToLoginRoutes.includes(pathname);

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated and trying to access protected content
      if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
        console.log(
          "Redirecting unauthenticated user to login from:",
          pathname,
        );
        router.replace("/login");
        return;
      }

      // If authenticated and on login/register pages, redirect to dashboard
      if (isAuthenticated && shouldRedirectToDashboard) {
        console.log(
          "Redirecting authenticated user to dashboard from:",
          pathname,
        );
        router.replace("/dashboard");
        return;
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    isPublicRoute,
    isAuthRoute,
    shouldRedirectToDashboard,
    pathname,
    router,
  ]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Allow access to public routes regardless of auth status
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Allow access to auth-specific routes only if authenticated
  if (isAuthRoute && isAuthenticated) {
    return <>{children}</>;
  }

  // Allow access to protected routes only if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If we get here, user is not authenticated and trying to access protected content
  // The useEffect will handle the redirect, so show loading
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AuthGuard;
