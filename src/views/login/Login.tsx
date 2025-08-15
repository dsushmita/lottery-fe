import Header from '@/components/Header'
import React from 'react'
import { Box, Container } from '@mui/material'
import LoginForm from './LoginForm'

function Login() {
  return (
    <div>
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 0 } }}>
          <LoginForm />
        </Container>
      </Box>
    </div>
  )
}

export default Login
