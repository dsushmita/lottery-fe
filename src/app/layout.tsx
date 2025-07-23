import './globals.css';

import { CssBaseline } from '@mui/material';
import ThemeRegistry from './ThemeRegistry';

export const metadata = {
  title: 'Lottery Frontend',
  description: 'Scalable Next.js frontend for lottery application with Material UI and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning= {true}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <CssBaseline />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}