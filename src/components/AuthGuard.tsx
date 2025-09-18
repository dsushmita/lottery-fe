'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/login', '/register', '/forget-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isPublicRoute) {
        router.replace('/login');
      }  else if (isAuthenticated && isPublicRoute) {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, pathname, router]);

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show auth pages if not authenticated and on public route
  if (!isAuthenticated && isPublicRoute) {
    return <>{children}</>;
  }

  // Show protected content if authenticated and not on auth pages
  if (isAuthenticated && !isPublicRoute) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
};

export default AuthGuard;