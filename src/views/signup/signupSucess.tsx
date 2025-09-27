
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { PrimaryButton } from '@/styles/authStyles';


export default function SignupSuccessPage() {
  return (
    <AuthLayout>
      <Box sx={{ textAlign: 'center' }}>
        {/* Success Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: '#22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
          }}
        >
          <Typography sx={{ fontSize: '2.5rem', color: 'white' }}>✓</Typography>
        </Box>

        {/* Header */}
        <AuthHeader
          title="Account Created Successfully!"
        //   variant="success"
          description="You have created account successfully, please login to join in the community."
        />

        {/* Login Button */}
        <PrimaryButton

          href="/login"
          sx={{ 
            mb: 3,
            bgcolor: '#3ABEF9',
            color: 'white',
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#2196f3',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(58, 190, 249, 0.3)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Login Now
        </PrimaryButton>

        {/* Footer Text */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Need help?
          </Typography>
          <Typography
            component={Link}
            href="/support"
            variant="body2"
            sx={{
              color: '#3ABEF9',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Contact Support
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
}