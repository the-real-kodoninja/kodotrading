import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { containerStyle, typographyHeaderStyle, buttonStyle, inputStyle } from '../../assets/styles/styles';
import { Google, Twitter } from '@mui/icons-material';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup, loginWithGoogle, loginWithX, loginWithKodoverse } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signup(data.email, data.username, data.password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign up with Google.');
    }
  };

  const handleXSignUp = async () => {
    try {
      await loginWithX();
      navigate('/');
    } catch (err) {
      setError('Failed to sign up with X.');
    }
  };

  const handleKodoverseSignUp = async () => {
    try {
      await loginWithKodoverse();
      navigate('/');
    } catch (err) {
      setError('Kodoverse signup not available yet.');
    }
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Sign Up
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
          label="Username"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
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
          Sign Up
        </Button>
      </Box>
      <Divider sx={{ my: 2 }}>OR</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleSignUp}
          sx={{ ...buttonStyle, borderColor: 'grey.500', color: 'text.primary' }}
        >
          Sign Up with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<Twitter />}
          onClick={handleXSignUp}
          sx={{ ...buttonStyle, borderColor: 'grey.500', color: 'text.primary' }}
        >
          Sign Up with X
        </Button>
        <Button
          variant="outlined"
          onClick={handleKodoverseSignUp}
          sx={{ ...buttonStyle, borderColor: 'grey.500', color: 'text.primary' }}
        >
          Sign Up with Kodoverse
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;