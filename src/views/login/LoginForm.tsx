
  import { useLogin } from '@/hooks/login/useLogin';
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
  import { FormEvent } from 'react';

  const LoginForm: React.FC = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { handleLogin, loading, error } = useLogin();

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!credentials.username || !credentials.password) return;
      handleLogin(credentials);
    };

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, borderRadius: 2, boxShadow: 1, bgcolor: 'white' }}
        className="transition-all duration-300 hover:shadow-lg"
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, borderRadius: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>
    );
  };

  export default LoginForm;