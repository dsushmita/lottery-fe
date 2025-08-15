import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

  import { useState } from 'react';
  import { FormEvent } from 'react';
import { useSignup } from '../../../hooks/signup/UseSignup';

  const SignupForm: React.FC = () => {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const { handleSignup, loading, error } = useSignup();

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!credentials.username || !credentials.email || !credentials.password || !credentials.confirmPassword) return;
      handleSignup(credentials);
    };

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'white' }}
        className="transition-all duration-300 hover:shadow-lg"
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
          Create Your Account
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Join the lottery community today!
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
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
          required
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, borderRadius: 1, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Signup'}
        </Button>
      </Box>
    );
  };

  export default SignupForm;