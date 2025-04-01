import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#F5F5F5', // Light background for the entire app
      paper: '#FFFFFF', // White background for cards, containers, etc.
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },
    body2: { color: '#666666' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)', // Subtle card gradient
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 20 } },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#18191A', // Dark background for the entire app
      paper: '#242526', // Slightly lighter background for cards, containers, etc.
    },
    text: {
      primary: '#E4E6EB',
      secondary: '#B0B3B8',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },
    body2: { color: '#B0B3B8' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(135deg, #2D2E2F 0%, #353839 100%)', // Subtle dark card gradient
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 20 } },
    },
  },
});