import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const DecentralizedIdentity: React.FC = () => {
  const [identity, setIdentity] = useState<string | null>(null);

  const createIdentity = () => {
    // Mock decentralized identity creation
    setIdentity('did:kodo:0x1234...5678');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Decentralized Identity</Typography>
      {identity ? (
        <Box sx={{ mt: 2 }}>
          <Typography>Your DID: {identity}</Typography>
          <Button onClick={() => setIdentity(null)} variant="outlined" sx={{ mt: 1 }}>
            Disconnect
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Create a decentralized identity to securely interact with KodoTrading.
          </Typography>
          <Button onClick={createIdentity} variant="contained" color="primary" sx={{ mt: 1 }}>
            Create DID
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default DecentralizedIdentity;
