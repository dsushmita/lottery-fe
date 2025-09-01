'use client';
import ClientWrapper from '@/components/ClientWrapper';

export default function Template({ children }: { children: React.ReactNode }) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
