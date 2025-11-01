import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      auth: {
        leftPanelBg: string;
        rightPanelBg: string;
        inputBg: string;
        inputBorder: string;
        primaryButton: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      auth?: {
        leftPanelBg?: string;
        rightPanelBg?: string;
        inputBg?: string;
        inputBorder?: string;
        primaryButton?: string;
      };
    };
  }
}

const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
 
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#3ABEF9',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  custom: {
    auth: {
      leftPanelBg: 'linear-gradient(135deg, #3ABEF9 0%, #4f46e5 100%)',
      rightPanelBg: '#ffffff',
      inputBg: '#f1f5f9',
      inputBorder: '#e2e8f0',
      primaryButton: '#3ABEF9',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3ABEF9',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  custom: {
    auth: {
      leftPanelBg: 'linear-gradient(135deg, #3ABEF9 0%, #4f46e5 100%)',
      rightPanelBg: '#1A1F29',
      inputBg: 'rgba(255, 255, 255, 0.05)',
      inputBorder: 'rgba(255, 255, 255, 0.2)',
      primaryButton: '#3ABEF9',
    },
  },
});