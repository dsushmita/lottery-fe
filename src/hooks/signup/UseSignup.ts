import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { User } from '@/types/auth/login';
import { SignupCredentials } from '@/types/auth/signup';
import { signup } from '@/services/signUpService';


  interface UseSignupReturn {
    user: User | null;
    loading: boolean;
    error: string | null;
    handleSignup: (credentials: SignupCredentials) => Promise<void>;
  }

  export const useSignup = (): UseSignupReturn => {
    const { user, setUser } = useContext(AuthContext) as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (credentials: SignupCredentials) => {
      setLoading(true);
      setError(null);
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      try {
        const data = await signup(credentials);
        setUser(data.user);
        localStorage.setItem('token', data.token);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Signup failed');
      } finally {
        setLoading(false);
      }
    };

    return { user, loading, error, handleSignup };
  };