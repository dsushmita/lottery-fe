'use client';
  import { Box, Container, Typography, Button } from '@mui/material';
  import Link from 'next/link';
import Header from '../components/Header';

  const HomePage: React.FC = () => {
    return (
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 0 }, textAlign: 'center' }}>
          <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to Lottery App
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Join the excitement and try your luck with our lottery system. Sign up or log in to get started!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" component={Link} href="/login" sx={{ px: 4, py: 1.5 }}>
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} href="/signup" sx={{ px: 4, py: 1.5 }}>
              Signup
            </Button>
          </Box>
        </Container>
      </Box>
    );
  };

  export default HomePage;