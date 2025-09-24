import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledTextField } from '@/styles/authStyles';

interface AuthTextFieldProps {
  name: string;
placeholder: string;           
  type?: string;
  register: any; // Keep it flexible to work with your existing forms
  error?: any;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  validation?: object;
  variant?: 'login' | 'signup';
  [key: string]: any; // Allow other props to pass through
}

export const AuthTextField: React.FC<AuthTextFieldProps> = ({
  name,
  placeholder,
  type = 'text',
  register,
  error,
  disabled = false,
  startIcon,
  showPassword,
  onTogglePassword,
  validation = {},
  variant = 'login',
  ...otherProps
}) => {
  const isPasswordField = type === 'password' || (type === 'text' && onTogglePassword);
  
  const getFieldStyles = () => {
    if (variant === 'signup') {
      return {
        // mb: 2,
        marginBottom: "10px",
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
          '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
          '&.Mui-focused fieldset': { borderColor: '#0ea5e9' },
          '& input': { color: 'white' },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-focused': { color: '#0ea5e9' },
        },
      };
    }
    return {}; // Use StyledTextField for login
  };

  const commonProps = {
    ...register(name, validation),
    fullWidth: true,
     placeholder,
    type: isPasswordField ? (showPassword ? 'text' : 'password') : type,
    variant: "outlined" as const,
    error: !!error,
    helperText: error?.message,
    disabled,
    InputProps: {
      startAdornment: startIcon && (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      ),
      endAdornment: isPasswordField && onTogglePassword && (
        <InputAdornment position="end">
          <IconButton
            onClick={onTogglePassword}
            edge="end"
            sx={{ 
              color: variant === 'signup' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary' 
            }}
            disabled={disabled}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
    ...otherProps
  };

  if (variant === 'signup') {
    return (
      <TextField
        {...commonProps}
        sx={getFieldStyles()}
      />
    );
  }

  // Use StyledTextField for login
  return <StyledTextField {...commonProps} />;
};