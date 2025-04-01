import React from 'react';
import { AppBar, Toolbar as MuiToolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface ToolbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isDarkMode, toggleTheme }) => (
  <AppBar position="static">
    <MuiToolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        KodoTrading
      </Typography>
      <IconButton color="inherit" onClick={toggleTheme}>
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </MuiToolbar>
  </AppBar>
);

export default Toolbar;
