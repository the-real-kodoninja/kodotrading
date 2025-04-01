import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8B0000' }, // Dark red
    secondary: { main: '#353839' }, // Onyx
    background: { default: '#FFFFFF', paper: '#F5F5F5' },
    text: { primary: '#353839', secondary: '#666666' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 8, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 20 } },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B0000' }, // Dark red
    secondary: { main: '#353839' }, // Onyx
    background: { default: '#353839', paper: '#424242' },
    text: { primary: '#FFFFFF', secondary: '#BBBBBB' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 8, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 20 } },
    },
  },
});