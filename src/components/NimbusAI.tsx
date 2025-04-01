import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

// Mock AI agent
const nimbusAI = () => {
  const stocks = ['AAPL', 'TSLA', 'GOOG'];
  return stocks[Math.floor(Math.random() * stocks.length)];
};

const NimbusAI: React.FC = () => {
  const [suggestion, setSuggestion] = useState('');

  const getSuggestion = () => {
    setSuggestion(nimbusAI());
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Nimbus.AI Stock Suggestion</Typography>
      <Button onClick={getSuggestion} variant="contained" sx={{ mt: 2 }}>Get AI Suggestion</Button>
      {suggestion && <Typography sx={{ mt: 2 }}>Suggested Stock: ${suggestion}</Typography>}
    </Container>
  );
};

export default NimbusAI;
