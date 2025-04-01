import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Legal: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Legal Information
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Kodotrading operates under the laws of [Your Jurisdiction]. All trading activities are subject to local regulations.
        </Typography>
        <Typography variant="body1">
          For legal inquiries, please contact us at legal@kodotrading.com.
        </Typography>
      </Box>
    </Container>
  );
};

export default Legal;
