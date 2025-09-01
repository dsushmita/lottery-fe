import { AuthProvider } from '@/context/AuthContext';
import ThemeRegistry from '@/ThemeRegistry';
import { CssBaseline } from '@mui/material';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <CssBaseline />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}