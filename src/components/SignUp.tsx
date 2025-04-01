import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
  onSignUp: (username: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (username.trim()) {
      onSignUp(username);
      navigate('/');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#E4E6EB' }}>
        Join Kodotrading
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sign Up
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
          onClick={handleSignUp}
          sx={{ mb: 2 }}
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          Already have an account?{' '}
          <Button onClick={() => navigate('/login')} color="primary">
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
