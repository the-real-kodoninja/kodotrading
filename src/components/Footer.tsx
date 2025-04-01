import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#242526',
        color: '#E4E6EB',
        py: 2,
        px: 3,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography variant="body2">
        © 2025 Kodoverse. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link component={RouterLink} to="/about" color="inherit" underline="hover">
          About
        </Link>
        <Link component={RouterLink} to="/legal" color="inherit" underline="hover">
          Legal
        </Link>
        <Link component={RouterLink} to="/terms" color="inherit" underline="hover">
          Terms & Conditions
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
