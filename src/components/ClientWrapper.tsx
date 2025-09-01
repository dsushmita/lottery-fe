'use client';
import { ReactNode } from 'react';
import AuthGuard from './AuthGuard';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
};

export default ClientWrapper;