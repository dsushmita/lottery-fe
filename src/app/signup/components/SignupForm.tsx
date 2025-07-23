'use client';
import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { SignupCredentials } from '@/app/types/auth';
import { useSignup } from '@/app/hooks/useSignup';

export default function SignupForm() {
  const [credentials, setCredentials] = useState<SignupCredentials>({ email: '', password: '', username: '' });
  const { signup, loading, error } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await signup(credentials);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" color="primary" align="center" gutterBottom>
        Sign Up
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Username"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!error && error.includes('username')}
      />
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
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <MuiLink component={NextLink} href="/login" color="primary">
          Login
        </MuiLink>
      </Typography>
    </Box>
  );
}