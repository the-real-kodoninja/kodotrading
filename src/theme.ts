import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8B0000' }, // Dark red
    secondary: { main: '#353839' }, // Onyx
    background: { default: '#FFFFFF', paper: '#F5F5F5' },
    text: { primary: '#353839' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B0000' }, // Dark red
    secondary: { main: '#353839' }, // Onyx
    background: { default: '#353839', paper: '#424242' },
    text: { primary: '#FFFFFF' },
  },
});
