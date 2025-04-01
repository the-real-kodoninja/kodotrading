import React from 'react';
import { AppBar, Toolbar as MuiToolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Auth from './Auth';

interface ToolbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  username: string | null;
  onLogin: (username: string) => void;
  onLogout: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isDarkMode, toggleTheme, isAuthenticated, username, onLogin, onLogout }) => (
  <AppBar position="static">
    <MuiToolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        KodoTrading
      </Typography>
      <IconButton color="inherit" onClick={toggleTheme}>
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Auth isAuthenticated={isAuthenticated} username={username} onLogin={onLogin} onLogout={onLogout} />
    </MuiToolbar>
  </AppBar>
);

export default Toolbar;