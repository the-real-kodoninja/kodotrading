import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

interface AuthProps {
  onLogin: (username: string) => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  username: string | null;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onLogout, isAuthenticated, username }) => {
  const [open, setOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState('');

  const handleLogin = () => {
    if (inputUsername.trim()) {
      onLogin(inputUsername);
      setOpen(false);
      setInputUsername('');
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Typography variant="body1" component="span" sx={{ mr: 2 }}>
            Welcome, {username}
          </Typography>
          <Button onClick={onLogout} color="inherit">Logout</Button>
        </div>
      ) : (
        <Button onClick={() => setOpen(true)} color="inherit">Login</Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Auth;
