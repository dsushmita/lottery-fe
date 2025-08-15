import { useState, useContext } from 'react';
  import { AuthResponse, User } from '../../types/auth/login';
  import { login } from '../../services/loginService';
import { AuthContext } from '@/context/AuthContext';

  interface UseLoginReturn {
    user: User | null;
    loading: boolean;
    error: string | null;
    handleLogin: (credentials: { username: string; password: string }) => Promise<void>;
  }

  export const useLogin = (): UseLoginReturn => {
    const { user, setUser } = useContext(AuthContext) as { user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (credentials: { username: string; password: string }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await login(credentials);
        setUser(data.user);
        localStorage.setItem('token', data.token);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      } finally {
        setLoading(false);
      }
    };

    return { user, loading, error, handleLogin };
  };