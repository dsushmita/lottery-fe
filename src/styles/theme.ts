import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  palette: {
    primary: { main: '#1E88E5' },
    secondary: { main: '#FFCA28' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 12 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
      },
    },
  },
});