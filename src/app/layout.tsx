import { AuthProvider } from '@/context/AuthContext';
import { CustomThemeProvider } from '@/context/ThemeContext';
import { CssBaseline } from '@mui/material';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'COP THEM - Lottery Application',
  description: 'Scalable Next.js frontend for lottery application with Material UI and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>
          <CssBaseline />
          <AuthProvider>
            {children}
          </AuthProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}