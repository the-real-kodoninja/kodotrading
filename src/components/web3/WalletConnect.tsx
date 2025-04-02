import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useWeb3 } from '../../context/Web3Context';
import { containerStyle, typographyHeaderStyle } from '../../assets/styles/styles';

const WalletConnect: React.FC = () => {
  const { account, connectWallet, disconnectWallet, error } = useWeb3();

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Wallet Connect
      </Typography>
      <Box sx={{ mt: 2 }}>
        {account ? (
          <>
            <Typography variant="body1">
              Connected Account: {account.slice(0, 6)}...{account.slice(-4)}
            </Typography>
            <Button variant="contained" color="secondary" onClick={disconnectWallet} sx={{ mt: 2 }}>
              Disconnect Wallet
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WalletConnect;