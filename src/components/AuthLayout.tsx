'use client';
import React from 'react';
import { Container, IconButton, Box, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import {
  AuthContainer,
  FormContainer,
  LeftPanel,
  RightPanel,
  LogoContainer
} from '@/styles/authStyles';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import logoImage from "../../public/image/companylogo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <AuthContainer>
      {/* Theme Toggle Button */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
          }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <FormContainer elevation={0}>
        <LeftPanel>
          {/* Top - COP THEM text */}
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              color="white"
              sx={{ letterSpacing: 2 }}
            >
              COP THEM
            </Typography>
          </Box>

          {/* Bottom - Logo Image */}
          <LogoContainer>
            <Image src={logoImage} alt="Logo" />
          </LogoContainer>
        </LeftPanel>
        <RightPanel>
          {children}
        </RightPanel>
      </FormContainer>
    </AuthContainer>
  );
};

export default AuthLayout;