'use client';
import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import {
  AuthContainer,
  FormContainer,
  LeftPanel,
  RightPanel,
  LogoContainer
} from '@/styles/authStyles';
import Image from 'next/image';
import logoImage from "../../public/image/companyLogo.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthContainer>
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <IconButton
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
          }}
        >
        </IconButton>
      </Box>
      <FormContainer elevation={0}>
        <LeftPanel>
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