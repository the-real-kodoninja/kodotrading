import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Terms: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Terms & Conditions
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          By using Kodotrading, you agree to our terms and conditions. You are responsible for all trades and activities conducted through your account.
        </Typography>
        <Typography variant="body1">
          We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
        </Typography>
      </Box>
    </Container>
  );
};

export default Terms;
