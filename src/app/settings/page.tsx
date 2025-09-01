'use client';
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Button,
  Box,
  Divider 
} from '@mui/material';
import PageLayout from '@/components/layouts/PageLayout';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <PageLayout 
      title="Settings" 
      subtitle="Manage your account preferences"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings' }
      ]}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email: {user?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Name: {user?.name}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom color="error">
            Danger Zone
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" gutterBottom>
                Sign Out
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign out from your account
              </Typography>
            </Box>
            <Button variant="outlined" color="error" onClick={logout}>
              Sign Out
            </Button>
          </Box>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default SettingsPage;