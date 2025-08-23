import React from 'react';
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox, Link, Alert } from '@mui/material';
import { Google, Twitter } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { AuthCredentials } from '@/types/auth/login';

import backgroundImage from "../../../src/image/authbackgroundimage.jpg";
import logoImage from "../../../src/image/companylogo.png";
import { useLogin } from '@/hooks/login/useLogin';

type FormData = AuthCredentials & {
  rememberMe: boolean;
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: { username: '', password: '', rememberMe: false },
  });

  // Use your custom login hook
  const { handleLogin, loading, error } = useLogin();

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with:', { 
      username: data.username, 
      rememberMe: data.rememberMe 
    });
    
    // Clear any previous errors
    setError('root', { message: '' });
    
    // Extract credentials without rememberMe
    const credentials: AuthCredentials = {
      username: data.username,
      password: data.password
    };
    
    try {
      await handleLogin(credentials);
      // Navigation will be handled by the useLogin hook
    } catch (error) {
      console.error('Login submission error:', error);
      // Error handling is managed by the useLogin hook
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%), url(${backgroundImage.src}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        position: 'relative',
      }}
    >
      {/* Left side with logo and company name */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 8,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: 'white',
            marginBottom: 3,
            fontSize: '3.5rem',
            letterSpacing: '0.1em',
          }}
        >
          COP THEM
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Image
            src={logoImage}
            alt="Logo"
            width={200}
            height={200}
            style={{
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
            }}
          />
        </Box>
      </Box>

      {/* Right side with login form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(20, 25, 40, 0.95)',
          padding: 4,
          borderRadius: 3,
          width: '400px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            marginBottom: 1,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Login to your account
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: 3,
            textAlign: 'center',
          }}
        >
          Don't have an account yet?{' '}
          <Link
            href="/register"
            sx={{
              color: '#4fc3f7',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Create Account
          </Link>
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              marginBottom: 2,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#f44336'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <TextField
                placeholder="Email"
                variant="outlined"
                fullWidth
                type="email"
                autoComplete="email"
                disabled={loading}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(40, 50, 70, 0.8)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4fc3f7',
                    },
                    '&.Mui-disabled fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f44336',
                  },
                }}
                {...field}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Must be at least 6 characters' },
            }}
            render={({ field }) => (
              <TextField
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                autoComplete="current-password"
                disabled={loading}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(40, 50, 70, 0.8)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4fc3f7',
                    },
                    '&.Mui-disabled fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f44336',
                  },
                }}
                {...field}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <FormControlLabel
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      disabled={loading}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        '&.Mui-checked': {
                          color: '#4fc3f7',
                        },
                        '&.Mui-disabled': {
                          color: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    />
                  )}
                />
              }
              label={
                <Typography sx={{ 
                  color: loading ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '0.9rem' 
                }}>
                  Remember me
                </Typography>
              }
            />
            <Link
              href="/forgot-password"
              sx={{
                color: loading ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                pointerEvents: loading ? 'none' : 'auto',
                '&:hover': {
                  color: '#4fc3f7',
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: '#4fc3f7',
              color: 'white',
              marginBottom: 3,
              padding: '12px',
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              '&:hover': {
                backgroundColor: '#29b6f6',
              },
              '&:disabled': {
                backgroundColor: 'rgba(79, 195, 247, 0.5)',
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </Button>

          <Box sx={{ textAlign: 'center', marginBottom: 3, color: 'rgba(255, 255, 255, 0.5)' }}>
            Or
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Google />}
              disabled={loading}
              sx={{
                borderRadius: 2,
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(60, 70, 90, 0.8)',
                flex: 1,
                padding: '10px',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(80, 90, 110, 0.8)',
                },
                '&:disabled': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(40, 50, 70, 0.5)',
                  color: 'rgba(255, 255, 255, 0.4)',
                },
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<Twitter />}
              disabled={loading}
              sx={{
                borderRadius: 2,
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(60, 70, 90, 0.8)',
                flex: 1,
                padding: '10px',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(80, 90, 110, 0.8)',
                },
                '&:disabled': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(40, 50, 70, 0.5)',
                  color: 'rgba(255, 255, 255, 0.4)',
                },
              }}
            >
              Twitter
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;