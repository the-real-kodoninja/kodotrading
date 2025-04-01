import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const VerifiableCredentials: React.FC = () => {
  const [credential, setCredential] = useState<string | null>(null);

  const issueCredential = () => {
    // Mock issuing a verifiable credential
    setCredential('VC: Certified Trader - Issued by KodoTrading on 2025-04-01');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Verifiable Credentials</Typography>
      {credential ? (
        <Box sx={{ mt: 2 }}>
          <Typography>{credential}</Typography>
          <Button onClick={() => setCredential(null)} variant="outlined" sx={{ mt: 1 }}>
            Clear Credential
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Issue a verifiable credential to prove your trading status.
          </Typography>
          <Button onClick={issueCredential} variant="contained" color="primary" sx={{ mt: 1 }}>
            Issue Credential
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default VerifiableCredentials;
