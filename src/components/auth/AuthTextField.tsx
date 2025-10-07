import React from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledTextField } from "@/styles/authStyles";

interface AuthTextFieldProps {
  name: string;
  placeholder?: string;
  type?: string;
  register: any;
  error?: any;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  validation?: object;
  variant?: "login" | "signup" | "forgot-password" | "reset-password";
  label?: string;
  [key: string]: any;
}

export const AuthTextField: React.FC<AuthTextFieldProps> = ({
  name,
  placeholder,
  type = "text",
  register,
  error,
  disabled = false,
  startIcon,
  showPassword,
  onTogglePassword,
  validation = {},
  variant = "login",
  label,
  ...otherProps
}) => {
  const isPasswordField =
    type === "password" || (type === "text" && onTogglePassword);

  const commonProps = {
    ...register(name, validation),
    fullWidth: true,
    label,
    placeholder,
    type: isPasswordField ? (showPassword ? "text" : "password") : type,
    variant: "outlined" as const,
    error: !!error,
    helperText: error?.message,
    disabled,
    InputProps: {
      startAdornment: startIcon && (
        <InputAdornment position="start">{startIcon}</InputAdornment>
      ),
      endAdornment: isPasswordField && onTogglePassword && (
        <InputAdornment position="end">
          <IconButton
            onClick={onTogglePassword}
            edge="end"
            sx={{
              color:
                variant === "login"
                  ? "text.secondary"
                  : "rgba(255, 255, 255, 0.7)",
            }}
            disabled={disabled}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
    ...otherProps,
  };

  if (
    variant === "signup" ||
    variant === "forgot-password" ||
    variant === "reset-password"
  ) {
    return <StyledTextField {...commonProps} />;
  }

  return <StyledTextField {...commonProps} />;
};
