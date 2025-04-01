import React, { useState } from 'react';
import {
  AppBar, Toolbar as MuiToolbar, Typography, TextField, Box, List, ListItem, ListItemText, Button, Select, MenuItem, IconButton,
} from '@mui/material';
import { Settings as SettingsIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  const [selectedBroker, setSelectedBroker] = useState('Alpaca');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    const results = [
      { type: 'ticker', value: 'AAPL' },
      { type: 'ticker', value: 'TSLA' },
      { type: 'user', value: 'TraderX' },
      { type: 'user', value: 'StockGuru' },
    ].filter((r) => r.value.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(results);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#242526', color: '#E4E6EB' }}>
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
            sx={{ background: '#3A3B3C', borderRadius: 20 }}
          />
          {searchResults.length > 0 && (
            <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: '#242526', boxShadow: 3, borderRadius: 2, zIndex: 10 }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            value={selectedBroker}
            onChange={(e) => setSelectedBroker(e.target.value)}
            size="small"
            sx={{ color: '#E4E6EB', bgcolor: '#3A3B3C', borderRadius: 20 }}
          >
            <MenuItem value="Alpaca">Alpaca</MenuItem>
            <MenuItem value="Binance">Binance</MenuItem>
            <MenuItem value="TradeZero">TradeZero</MenuItem>
            <MenuItem value="IB">Interactive Brokers</MenuItem>
          </Select>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {isAuthenticated ? (
            <>
              <Typography sx={{ mr: 2 }}>Welcome, {username}</Typography>
              <IconButton onClick={() => navigate('/settings')} color="inherit">
                <SettingsIcon />
              </IconButton>
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