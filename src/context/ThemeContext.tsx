'use client';
import React, { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme';

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};