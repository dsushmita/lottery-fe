import React from "react";
import { Typography, Box } from "@mui/material";
import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  variant?: "login" | "signup" | "forgot-password" | "reset-password";
  description?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  linkText,
  linkHref,
  variant = "login",
  description,
}) => {
  // Base styles 
  const baseStyles = {
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      mb: 1,
    },
    description: {
      textAlign: "center",
      lineHeight: 1.6,
    },
    subtitle: {
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
      fontWeight: 500,
      "&:hover": { textDecoration: "underline" },
    },
  };
  const variantOverrides = {
    login: {
      title: { color: "text.primary" },
      description: { color: "text.secondary" },
      subtitle: { color: "text.secondary" },
      link: { color: "primary.main" },
    },
    signup: {
      title: { color: "white" },
      description: { color: "rgba(255, 255, 255, 0.7)" },
      subtitle: { color: "rgba(255, 255, 255, 0.7)" },
      link: { color: "#0ea5e9" },
    },
    "forgot-password": {
      title: { color: "white", fontWeight: 600, mb: description ? 2 : 3 },
      description: { color: "rgba(255, 255, 255, 0.7)" },
      subtitle: { color: "rgba(255, 255, 255, 0.7)" },
      link: { color: "#6366f1" },
    },
    "reset-password": {
      title: { color: "white", mb: description ? 1 : 2 },
      description: { color: "rgba(255, 255, 255, 0.7)", mb: 4 },
      subtitle: { color: "rgba(255, 255, 255, 0.7)" },
      link: { color: "#6366f1" },
    },
  };

  const styles = {
    title: { ...baseStyles.title, ...variantOverrides[variant].title },
    description: { ...baseStyles.description, ...variantOverrides[variant].description },
    subtitle: { ...baseStyles.subtitle, ...variantOverrides[variant].subtitle },
    link: { ...baseStyles.link, ...variantOverrides[variant].link },
  };

  const isPasswordReset = variant === "reset-password";
  const isSignup = variant === "signup";

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component={isPasswordReset ? "h1" : "div"}
        sx={styles.title}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={styles.description}>
          {description}
        </Typography>
      )}
      {(subtitle || linkText) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: isSignup ? "10px" : 1,
            flexDirection: isSignup ? "column" : "row",
          }}
        >
          {subtitle && (
            <Typography variant="body2" sx={styles.subtitle}>
              {subtitle}
            </Typography>
          )}

          {linkText && linkHref && (
            <Typography
              component={Link}
              href={linkHref}
              variant="body2"
              sx={styles.link}
            >
              {linkText}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};