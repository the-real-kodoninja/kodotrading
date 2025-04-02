import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const DecentralizedStorage: React.FC = () => {
  const [storedData, setStoredData] = useState<string | null>(null);

  const saveToStorage = () => {
    // Mock saving to decentralized storage (e.g., IPFS)
    const data = JSON.stringify({ watchlist: ['AAPL', 'TSLA'] });
    setStoredData(`ipfs://QmHash123.../${data}`);
  };

  const retrieveFromStorage = () => {
    // Mock retrieving from decentralized storage
    setStoredData('Retrieved: ' + storedData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Decentralized Storage</Typography>
      <Box sx={{ mt: 2 }}>
        <Button onClick={saveToStorage} variant="contained" color="primary" sx={{ mr: 1 }}>
          Save Watchlist to IPFS
        </Button>
        <Button onClick={retrieveFromStorage} variant="outlined">
          Retrieve from IPFS
        </Button>
      </Box>
      {storedData && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">{storedData}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default DecentralizedStorage;
