"use client";
import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useGoogleAuth } from "@/hooks/login/useGoogleAuth";

interface GoogleLoginButtonProps {
  disabled?: boolean;
  variant?: "button" | "custom";
}

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function GoogleLoginButton({
  disabled,
  variant = "custom",
}: GoogleLoginButtonProps) {
  const {
    loading,
    error,
    initializeGoogleAuth,
    signInWithGoogle,
    renderGoogleButton,
    clearError,
  } = useGoogleAuth();

  const googleButtonRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const timer = setTimeout(() => {
        initializeGoogleAuth();

        if (variant === "button" && googleButtonRef.current) {
          renderGoogleButton("google-signin-button");
        } else if (variant === "custom" && googleButtonRef.current) {
          renderGoogleButton("google-signin-button-custom");
        }

        isInitialized.current = true;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [initializeGoogleAuth, renderGoogleButton, variant]);

  if (variant === "button") {
    return (
      <div>
        <div
          id="google-signin-button"
          ref={googleButtonRef}
          style={{ display: disabled ? "none" : "block" }}
        />
        {disabled && (
          <Button disabled sx={{ width: 280, height: 40 }}>
            Google Sign In (Disabled)
          </Button>
        )}
      </div>
    );
  }

  // For custom variant, use a styled wrapper around the Google button
  return (
    <div
      style={{
        position: "relative",
        minWidth: 50,

        height: 50,
        borderRadius: 3,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }
      }}
    >
      <div
        id="google-signin-button-custom"
        ref={googleButtonRef}
        style={{
          display: disabled ? "none" : "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
      />
      <GoogleIcon />
      {disabled && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
          }}
        />
      )}
    </div>
  );
}
