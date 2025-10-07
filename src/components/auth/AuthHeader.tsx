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
      color: "#0ea5e9"  ,
      "&:hover": { textDecoration: "underline" },
      

    },
  };

  const isPasswordReset = variant === "reset-password";
 

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component={isPasswordReset ? "h1" : "div"}
        sx={baseStyles.title}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={baseStyles.description}>
          {description}
        </Typography>
      )}
      {(subtitle || linkText) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1
          }}
        >
          {subtitle && (
            <Typography variant="body2" sx={baseStyles.subtitle}>
              {subtitle}
            </Typography>
          )}

          {linkText && linkHref && (
            <Typography
              component={Link}
              href={linkHref}
              variant="body2"
              sx={baseStyles.link}
            >
              {linkText}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};