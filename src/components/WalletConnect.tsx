import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const WalletConnect: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = () => {
    // Mock wallet connection
    setWalletAddress('0x1234...5678');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Wallet Connect</Typography>
      {walletAddress ? (
        <Box sx={{ mt: 2 }}>
          <Typography>Connected: {walletAddress}</Typography>
          <Button onClick={() => setWalletAddress(null)} variant="outlined" sx={{ mt: 1 }}>
            Disconnect
          </Button>
        </Box>
      ) : (
        <Button onClick={connectWallet} variant="contained" color="primary" sx={{ mt: 2 }}>
          Connect Wallet
        </Button>
      )}
    </Container>
  );
};

export default WalletConnect;
