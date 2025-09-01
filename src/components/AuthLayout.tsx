'use client';
import React from 'react';
import { Container } from '@mui/material';

import Image from 'next/image';
import logoImage from "@/public/image/logo.png";
import { AuthContainer, FormContainer, LeftPanel, LogoContainer, RightPanel } from '@/styles/AuthFormStyle';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthContainer>
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <FormContainer elevation={0}>
          <LeftPanel>
            <LogoContainer>
              <Image
                src={logoImage}
                alt="COP THEM"
                width={200}
                height={80}
                priority
              />
            </LogoContainer>
          </LeftPanel>
          <RightPanel>
            {children}
          </RightPanel>
        </FormContainer>
      </Container>
    </AuthContainer>
  );
};

export default AuthLayout;