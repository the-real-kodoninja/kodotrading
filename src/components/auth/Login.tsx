import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { containerStyle, typographyHeaderStyle, buttonStyle, inputStyle } from '../../assets/styles/styles';
import { Google, Twitter } from '@mui/icons-material';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithX, loginWithKodoverse } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to log in with Google.');
    }
  };

  const handleXLogin = async () => {
    try {
      await loginWithX();
      navigate('/');
    } catch (err) {
      setError('Failed to log in with X.');
    }
  };

  const handleKodoverseLogin = async () => {
    try {
      await loginWithKodoverse();
      navigate('/');
    } catch (err) {
      setError('Kodoverse login not available yet.');
    }
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Login
      </Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          variant="outlined"
          sx={inputStyle}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          sx={inputStyle}
        />
        <Button type="submit" variant="contained" sx={buttonStyle}>
          Login
        </Button>
      </Box>
      <Divider sx={{ my: 2 }}>OR</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          sx={{ ...buttonStyle, borderColor: 'grey.500', color: 'text.primary' }}
        >
          Login with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<Twitter />}
          onClick={handleXLogin}
          sx={{ ...buttonStyle, borderColor: 'grey.500', color: 'text.primary' }}
        >
          Login with X
        </Button>
        <Button
          variant="outlined"
          onClick={handleKodoverseLogin}
          sx={{ ...buttonStyle, borderColor: 'grey.500', color: 'text.primary' }}
        >
          Login with Kodoverse
        </Button>
      </Box>
    </Container>
  );
};

export default Login;