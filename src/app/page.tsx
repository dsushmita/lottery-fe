"use client" ;
import { Container } from '@mui/material';
import Navbar from './components/NavBar';

export default function LoginPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <Container maxWidth="lg">
        <h1>Dashboard</h1>
      </Container>
    </div>
  );
}