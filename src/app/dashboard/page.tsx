'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/layouts/PageLayout';
import { Typography } from '@mui/material'; 

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <MainLayout title="Dashboard">
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Dashboard
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Welcome back, {user?.name}!
      </Typography>
    </MainLayout>
  );
}