import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
      navigate('/');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#E4E6EB' }}>
        Welcome to Kodotrading
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mb: 2 }}
        >
          Login
        </Button>
        <Typography variant="body2">
          Don’t have an account?{' '}
          <Button onClick={() => navigate('/signup')} color="primary">
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
