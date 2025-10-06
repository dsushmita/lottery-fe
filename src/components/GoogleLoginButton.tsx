"use client";
import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useGoogleAuth } from "@/hooks/login/useGoogleAuth";

interface GoogleLoginButtonProps {
  disabled?: boolean;
  variant?: "button" | "custom";
}

const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
      fill="#FFC107"
    />
    <path
      d="M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
      fill="#FF3D00"
    />
    <path
      d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5719 17.5745 13.3038 18.0014 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z"
      fill="#4CAF50"
    />
    <path
      d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
      fill="#1976D2"
    />
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
