"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox, Link, Alert, IconButton, InputAdornment } from '@mui/material';
import { Google, Twitter, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { SignupFormData } from '@/types/auth/signup';

import geometricBackground from "../../../public/image/bgimage.png";
import logoImage from "../../../public/image/companylogo.png";
import { useSignup } from '@/hooks/signup/UseSignup';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignupFormData>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    },
  });

  const { handleSignup, loading, error } = useSignup();

  // Watch password for confirmation validation
  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    console.log('Signup form submitted with:', {
      userName: data.userName,
      email: data.email,
      acceptTerms: data.acceptTerms
    });

    // Clear any previous errors
    setError('root', { message: '' });

    // Extract credentials without confirmPassword and acceptTerms
    const credentials = {
      username: data.userName,
      email: data.email,
      password: data.password
    };

    try {
      await handleSignup(credentials);
      // Navigation will be handled by the useSignup hook
    } catch (error) {
      console.error('Signup submission error:', error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${geometricBackground.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      {/* Main Centered Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          height: '100vh',
          padding: 8

        }}
      >
        {/* Left Section with Logo and Text */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Space between the elements 
            alignItems: 'center',
            width: '50%',
            height: '100%',
            backgroundColor: '#0B0F14',
            padding: { xs: 3, md: 4 },
          }}
        >
          {/* Wrapping Typography inside a Box */}
          <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: 'white',
                fontSize: { xs: '3rem', md: '4rem' },
                letterSpacing: '0.1em',
                textShadow: '0 4px 8px rgba(0,0,0,0.5)',
              }}
            >
              COP THEM
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6))',
            }}
          >
            <Image
              src={logoImage}
              alt="COP THEM Logo"
              width={250}
              height={250}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              priority
            />
          </Box>
        </Box>


        {/* Right Section with Signup Form */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(15, 25, 40, 0.95)',
              padding: { xs: 3, md: 4 },
              width: '100%',
              maxWidth: '450px',
              backdropFilter: 'blur(20px)',
              height: '100vh'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                marginBottom: 1,
                fontWeight: 600,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
              }}
            >
              Create your account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: 3,
                textAlign: 'center',
                fontSize: '0.9rem',
              }}
            >
              Already have an account?{' '}
              <Link
                href="/login"
                sx={{
                  color: '#4fc3f7',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#29b6f6'
                  },
                }}
              >
                Login here
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

            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              {/* Username Field */}
              <Controller
                name="userName"
                control={control}
                rules={{
                  required: 'UserName is required',
                  minLength: { value: 3, message: 'UserName must be at least 3 characters' },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'UserName can only contain letters, numbers, and underscores'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    placeholder="UserName"
                    variant="outlined"
                    fullWidth
                    disabled={loading}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(25, 30, 45, 0.8)',
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4fc3f7',
                          borderWidth: '2px',
                        },
                        '&.Mui-disabled fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.08)',
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
                    error={!!errors.userName}
                    helperText={errors.userName ? errors.userName.message : ''}
                  />
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
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
                    placeholder="Email Address"
                    variant="outlined"
                    fullWidth
                    type="email"
                    autoComplete="email"
                    disabled={loading}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(25, 30, 45, 0.8)',
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4fc3f7',
                          borderWidth: '2px',
                        },
                        '&.Mui-disabled fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.08)',
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
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    autoComplete="new-password"
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                            disabled={loading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(25, 30, 45, 0.8)',
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4fc3f7',
                          borderWidth: '2px',
                        },
                        '&.Mui-disabled fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.08)',
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

              {/* Confirm Password Field */}
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match'
                }}
                render={({ field }) => (
                  <TextField
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    autoComplete="new-password"
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                            disabled={loading}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(25, 30, 45, 0.8)',
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4fc3f7',
                          borderWidth: '2px',
                        },
                        '&.Mui-disabled fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.08)',
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
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                  />
                )}
              />

              {/* Terms and Conditions Checkbox */}
              <Box sx={{ marginBottom: 3 }}>
                <FormControlLabel
                  control={
                    <Controller
                      name="acceptTerms"
                      control={control}
                      rules={{ required: 'You must accept the terms and conditions' }}
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
                      I am 18+ and have read and accept the{' '}
                      <Link href="/terms" sx={{ color: '#4fc3f7', textDecoration: 'none' }}>
                        Terms and Conditions
                      </Link>
                    </Typography>
                  }
                />
                {errors.acceptTerms && (
                  <Typography variant="caption" sx={{ color: '#f44336', marginLeft: 4, fontSize: '0.75rem' }}>
                    {errors.acceptTerms.message}
                  </Typography>
                )}
              </Box>

              {/* Create Account Button */}
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: '#4fc3f7',
                  color: 'white',
                  marginBottom: 3,
                  padding: '14px',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(79, 195, 247, 0.3)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#29b6f6',
                    boxShadow: '0 6px 16px rgba(79, 195, 247, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(79, 195, 247, 0.5)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    boxShadow: 'none',
                    transform: 'none',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box sx={{
                textAlign: 'center',
                marginBottom: 3,
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}>
                Or
              </Box>

              {/* Social Login Buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', width: '100%' }}>
                <Button
                  variant="outlined"
                  startIcon={<Google />}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(45, 55, 75, 0.6)',
                    flex: 1,
                    padding: '12px 8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(65, 75, 95, 0.8)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      backgroundColor: 'rgba(25, 35, 55, 0.4)',
                      color: 'rgba(255, 255, 255, 0.4)',
                      transform: 'none',
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
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(45, 55, 75, 0.6)',
                    flex: 1,
                    padding: '12px 8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(65, 75, 95, 0.8)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      backgroundColor: 'rgba(25, 35, 55, 0.4)',
                      color: 'rgba(255, 255, 255, 0.4)',
                      transform: 'none',
                    },
                  }}
                >
                  Twitter
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupForm;
