import React, { useState } from 'react';
import {
  AppBar, Toolbar as MuiToolbar, Typography, IconButton, Switch, TextField, Box, List, ListItem, ListItemText,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ToolbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  username: string | null;
  onLogin: (username: string) => void;
  onLogout: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isDarkMode, toggleTheme, isAuthenticated, username, onLogin, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: 'ticker' | 'user'; value: string }[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    // Mock search results
    const results = [
      { type: 'ticker', value: 'AAPL' },
      { type: 'ticker', value: 'TSLA' },
      { type: 'user', value: 'TraderX' },
      { type: 'user', value: 'StockGuru' },
    ].filter((r) => r.value.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(results);
  };

  const handleLogin = () => {
    const username = prompt('Enter your username:') || 'Guest';
    onLogin(username);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: isDarkMode ? '#242526' : '#FFFFFF', color: isDarkMode ? '#E4E6EB' : '#1C2526' }}>
      <MuiToolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h6">KodoTrading</Typography>
        <Box sx={{ position: 'relative', flexGrow: 1, mx: 2 }}>
          <TextField
            fullWidth
            placeholder="Search tickers, users..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ background: isDarkMode ? '#3A3B3C' : '#F0F2F5', borderRadius: 20 }}
          />
          {searchResults.length > 0 && (
            <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: isDarkMode ? '#242526' : '#FFFFFF', boxShadow: 3, borderRadius: 2, zIndex: 10 }}>
              <List>
                {searchResults.map((result, i) => (
                  <ListItem key={i} button>
                    <ListItemText primary={`${result.type === 'ticker' ? '$' : ''}${result.value}`} secondary={result.type} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
          {isAuthenticated ? (
            <>
              <Typography sx={{ mr: 2 }}>Welcome, {username}</Typography>
              <Button onClick={onLogout} color="inherit">Logout</Button>
            </>
          ) : (
            <Button onClick={handleLogin} color="inherit">Login</Button>
          )}
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;