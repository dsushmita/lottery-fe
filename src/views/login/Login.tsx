import React from 'react'
import LoginForm from './LoginForm'
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const handleCreateAccount = () => {
    router.push('/signUp');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };
  return (
    <LoginForm
      onCreateAccount={handleCreateAccount}
      onForgotPassword={handleForgotPassword}
    />
  )
}

export default Login


