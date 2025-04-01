import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';

const calculateStopLoss = (entryPrice: number, stopLoss: number, takeProfit: number, trailing: boolean, trailingPercent: number) => {
  const slPrice = entryPrice - stopLoss;
  const tpPrice = entryPrice + takeProfit;
  let trailingStop = trailing ? entryPrice * (1 - trailingPercent / 100) : null;
  return { slPrice, tpPrice, trailingStop };
};

const calculateRisk = (entryPrice: number, stopLoss: number, positionSize: number) => {
  const riskPerShare = entryPrice - (entryPrice - stopLoss);
  return riskPerShare * positionSize;
};

const StopLoss: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [trailing, setTrailing] = useState(false);
  const [trailingPercent, setTrailingPercent] = useState('');
  const [positionSize, setPositionSize] = useState('');
  const [result, setResult] = useState<{ slPrice: number; tpPrice: number; trailingStop: number | null; risk?: number } | null>(null);

  const handleCalculate = () => {
    const ep = Number(entryPrice);
    const sl = Number(stopLoss);
    const tp = Number(takeProfit);
    const tpPercent = Number(trailingPercent);
    const ps = Number(positionSize);
    if (ep && sl && tp) {
      const calc = calculateStopLoss(ep, sl, tp, trailing, tpPercent);
      const risk = ps ? calculateRisk(ep, sl, ps) : undefined;
      setResult({ ...calc, risk });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Stop Loss / Take Profit Calculator</Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Entry Price" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} type="number" />
        <TextField label="Stop Loss" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} type="number" />
        <TextField label="Take Profit" value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)} type="number" />
        <FormControlLabel
          control={<Checkbox checked={trailing} onChange={(e) => setTrailing(e.target.checked)} />}
          label="Enable Trailing Stop"
        />
        {trailing && (
          <TextField
            label="Trailing Stop Percent"
            value={trailingPercent}
            onChange={(e) => setTrailingPercent(e.target.value)}
            type="number"
          />
        )}
        <TextField label="Position Size (Shares)" value={positionSize} onChange={(e) => setPositionSize(e.target.value)} type="number" />
        <Button onClick={handleCalculate} variant="contained">Calculate</Button>
      </Box>
      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography>Stop Loss Price: ${result.slPrice.toFixed(2)}</Typography>
          <Typography>Take Profit Price: ${result.tpPrice.toFixed(2)}</Typography>
          {result.trailingStop && <Typography>Trailing Stop Price: ${result.trailingStop.toFixed(2)}</Typography>}
          {result.risk && <Typography>Risk: ${result.risk.toFixed(2)}</Typography>}
        </Box>
      )}
    </Container>
  );
};

export default StopLoss;