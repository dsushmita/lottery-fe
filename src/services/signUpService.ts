import { AuthResponse } from '@/types/auth/login';
import { SignupCredentials } from '@/types/auth/signup';


  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const { confirmPassword, ...signupData } = credentials;
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  };