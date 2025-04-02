import React, { useState } from 'react';
import { AppBar, Toolbar as MuiToolbar, Typography, IconButton, Switch, TextField, Box, Button } from '@mui/material';
import { Brightness4, Brightness7, Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

interface ToolbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth(); // Use AuthContext

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/stock/${searchQuery.toUpperCase()}`);
      setSearchQuery('');
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <MuiToolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            KodoTrading
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search stock (e.g., AAPL)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              ),
            }}
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
          />
          <Button component={Link} to="/alerts" variant="outlined" size="small">
            Alerts
          </Button>
          {isAuthenticated ? (
            <>
              <Typography variant="body2">{username}</Typography>
              <Button onClick={logout} variant="outlined" size="small">
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" variant="outlined" size="small">
              Login
            </Button>
          )}
          <Switch checked={isDarkMode} onChange={toggleTheme} />
          <IconButton onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;