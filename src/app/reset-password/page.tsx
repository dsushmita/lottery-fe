'use client';

import ResetPasswordForm from "@/views/resetPassword/ResetPasswordForm";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

const ResetPassword: React.FC = () => {
console.log('Rendering ResetPassword component');
  return (
    <Suspense fallback={
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#242A3A'
      }}>
        <CircularProgress sx={{ color: '#6366f1' }} />
      </Box>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;