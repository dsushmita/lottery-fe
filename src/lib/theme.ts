import { createTheme } from '@mui/material/styles';

// Color palette from your Figma design
export const colors = {
  primary: '#3ABEF9',
  bgDark: '#0B0F14',
  bgSecondary: '#1A1F29',
  info: '#2F80ED',
  success: '#27AE60',
  warning: '#E2B93B',
  error: '#EB5757',
  white: '#FFFFFF',
  gray: {
    light: '#8E9AAB',
    medium: '#6B7280',
    dark: '#4B5563',
  }
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      contrastText: colors.bgDark,
    },
    secondary: {
      main: colors.bgSecondary,
      contrastText: colors.white,
    },
    background: {
      default: colors.bgDark,
      paper: colors.bgSecondary,
    },
    text: {
      primary: colors.white,
      secondary: colors.gray.light,
    },
    info: {
      main: colors.info,
      contrastText: colors.white,
    },
    success: {
      main: colors.success,
      contrastText: colors.white,
    },
    warning: {
      main: colors.warning,
      contrastText: colors.bgDark,
    },
    error: {
      main: colors.error,
      contrastText: colors.white,
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: colors.white,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.white,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: colors.white,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.white,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: colors.white,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: colors.white,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.bgDark,
          color: colors.white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: colors.bgDark,
          '&:hover': {
            backgroundColor: '#2A8EC7',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: colors.bgSecondary,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputBase-input': {
            color: colors.white,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: colors.bgSecondary,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgSecondary,
          backgroundImage: 'none',
        },
      },
    },
  },
});