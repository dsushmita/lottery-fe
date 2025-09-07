'use client';
import { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useGoogleAuth } from '@/hooks/login/useGoogleAuth';

interface GoogleLoginButtonProps {
  disabled?: boolean;
  variant?: 'button' | 'custom';
}

export default function GoogleLoginButton({ 
  disabled, 
  variant = 'custom' 
}: GoogleLoginButtonProps) {
  const { 
    loading, 
    error, 
    initializeGoogleAuth, 
    signInWithGoogle, 
    renderGoogleButton,
    clearError 
  } = useGoogleAuth();
  
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const timer = setTimeout(() => {
        initializeGoogleAuth();
        
        if (variant === 'button' && googleButtonRef.current) {
          renderGoogleButton('google-signin-button');
        }
        
        isInitialized.current = true;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [initializeGoogleAuth, renderGoogleButton, variant]);

  if (variant === 'button') {
    return (
      <div>
        <div 
          id="google-signin-button" 
          ref={googleButtonRef}
          style={{ display: disabled ? 'none' : 'block' }}
        />
        {disabled && (
          <Button disabled sx={{ width: 280, height: 40 }}>
            Google Sign In (Disabled)
          </Button>
        )}
      </div>
    );
  }

  const handleClick = () => {
    clearError();
    signInWithGoogle();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || loading}
      sx={{
        minWidth: 50,
        height: 50,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
        '&:disabled': {
          opacity: 0.5,
        },
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      }}
    >
      <Google />
    </Button>
  );
}
