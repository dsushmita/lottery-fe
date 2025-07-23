import { Box, Container } from '@mui/material';
import LoginForm from '../login/components/loginForm';


export default function LoginPage() {
  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Box>
  );
}