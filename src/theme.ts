import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8B0000' },
    secondary: { main: '#3A3B3C' },
    background: { default: '#F0F2F5', paper: '#FFFFFF' },
    text: { primary: '#1C2526', secondary: '#65676B' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },
    body2: { color: '#65676B' },
  },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 20 } },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B0000' },
    secondary: { main: '#E4E6EB' },
    background: { default: '#18191A', paper: '#242526' },
    text: { primary: '#E4E6EB', secondary: '#B0B3B8' },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },
    body2: { color: '#B0B3B8' },
  },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', borderRadius: 20 } },
    },
  },
});