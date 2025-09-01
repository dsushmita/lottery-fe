'use client';
import React, { ReactNode } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title = 'COP THEM',
  maxWidth = 'lg' 
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {title}
          </Typography>
          
          {user && (
            <Typography variant="body2" sx={{ mr: 2, color: 'inherit' }}>
              Welcome, {user.name}
            </Typography>
          )}

          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {user && (
            <IconButton color="inherit" onClick={handleLogout}>
              <Logout />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth={maxWidth} sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;