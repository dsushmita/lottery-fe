import React from "react";
import { Typography, Box } from "@mui/material";
import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  variant?: "login" | "signup";
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  linkText,
  linkHref,
  variant = "login",
}) => {
  const getHeaderStyles = () => {
    if (variant === "signup") {
      return {
        title: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          mb: 1,
        },
        subtitle: {
          color: "rgba(255, 255, 255, 0.7)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column", // or "row"
          gap: "10px", // space between children
        },

        link: {
          color: "#0ea5e9",
          textDecoration: "none",
        },
      };
    }

    return {
      title: {
        mb: 1,
        fontWeight: 600,
        color: "text.primary",
      },
      subtitle: {
        color: "text.secondary",
      },
      link: {
        color: "primary.main",
        textDecoration: "none",
        fontWeight: 500,
        "&:hover": { textDecoration: "underline" },
      },
    };
  };

  const styles = getHeaderStyles();

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: "10px",
        }}
      >
        {title}
      </Typography>

      {(subtitle || linkText) && (
        <Box
          sx={{
            pb: "32px",
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            gap: 1,
            ...(variant === "signup" && { justifyContent: "center" }),
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
    </>
  );
};
