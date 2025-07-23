'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { LoginCredentials } from '@/app/types/auth';
import { useLogin } from '@/app/hooks/useLogin';

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const { login, loading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await login(credentials);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" color="primary" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!error && error.includes('email')}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!error && error.includes('password')}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don&apos;t have an account?{' '}
        <MuiLink component={NextLink} href="/signup" color="primary">
          Sign Up
        </MuiLink>
      </Typography>
    </Box>
  );
}