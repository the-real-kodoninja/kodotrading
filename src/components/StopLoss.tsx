import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

// Adapted from stoploss repo
const calculateStopLoss = (entryPrice: number, stopLoss: number, takeProfit: number) => {
  const slPrice = entryPrice - stopLoss;
  const tpPrice = entryPrice + takeProfit;
  return { slPrice, tpPrice };
};

const StopLoss: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [result, setResult] = useState<{ slPrice: number; tpPrice: number } | null>(null);

  const handleCalculate = () => {
    const ep = Number(entryPrice);
    const sl = Number(stopLoss);
    const tp = Number(takeProfit);
    if (ep && sl && tp) setResult(calculateStopLoss(ep, sl, tp));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Stop Loss / Take Profit Calculator</Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Entry Price"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          type="number"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Stop Loss"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          type="number"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Take Profit"
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
          type="number"
        />
        <Button onClick={handleCalculate} variant="contained" sx={{ mt: 1 }}>Calculate</Button>
      </Box>
      {result && (
        <Typography sx={{ mt: 2 }}>
          Stop Loss Price: ${result.slPrice.toFixed(2)}, Take Profit Price: ${result.tpPrice.toFixed(2)}
        </Typography>
      )}
    </Container>
  );
};

export default StopLoss;
