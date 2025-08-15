'use client';
  import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
  import { User } from '../types/auth/login';

  interface AuthContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
  }

  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setUser({ id: '1', username: 'testuser', email: 'test@example.com', token });
      }
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
  };