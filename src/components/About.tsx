import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        About Kodotrading
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Kodotrading is a next-generation trading platform that combines traditional finance with Web3, Web4, and Web5 technologies. Trade stocks, crypto, and NFTs while engaging with a vibrant community of traders.
        </Typography>
        <Typography variant="body1">
          Built by a team passionate about decentralization and financial empowerment, Kodoverse aims to redefine how traders interact with markets and each other.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
