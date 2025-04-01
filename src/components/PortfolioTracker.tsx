import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface Position {
  ticker: string;
  shares: number;
  entryPrice: number;
  currentPrice: number;
}

const PortfolioTracker: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([
    { ticker: 'AAPL', shares: 10, entryPrice: 175, currentPrice: 178 },
    { ticker: 'TSLA', shares: 5, entryPrice: 420, currentPrice: 415 },
  ]);
  const [newPosition, setNewPosition] = useState({ ticker: '', shares: '', entryPrice: '' });

  const handleAddPosition = () => {
    const { ticker, shares, entryPrice } = newPosition;
    if (!ticker || !shares || !entryPrice) return;
    setPositions((prev) => [
      ...prev,
      { ticker, shares: Number(shares), entryPrice: Number(entryPrice), currentPrice: Number(entryPrice) + (Math.random() * 10 - 5) },
    ]);
    setNewPosition({ ticker: '', shares: '', entryPrice: '' });
  };

  const totalValue = positions.reduce((sum, pos) => sum + pos.shares * pos.currentPrice, 0);
  const totalGainLoss = positions.reduce((sum, pos) => sum + (pos.currentPrice - pos.entryPrice) * pos.shares, 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Portfolio Tracker</Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="Ticker"
          value={newPosition.ticker}
          onChange={(e) => setNewPosition((prev) => ({ ...prev, ticker: e.target.value }))}
        />
        <TextField
          label="Shares"
          value={newPosition.shares}
          onChange={(e) => setNewPosition((prev) => ({ ...prev, shares: e.target.value }))}
          type="number"
        />
        <TextField
          label="Entry Price"
          value={newPosition.entryPrice}
          onChange={(e) => setNewPosition((prev) => ({ ...prev, entryPrice: e.target.value }))}
          type="number"
        />
        <Button onClick={handleAddPosition} variant="contained">Add</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Entry Price</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>Gain/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((pos, i) => (
            <TableRow key={i}>
              <TableCell>${pos.ticker}</TableCell>
              <TableCell>{pos.shares}</TableCell>
              <TableCell>${pos.entryPrice.toFixed(2)}</TableCell>
              <TableCell>${pos.currentPrice.toFixed(2)}</TableCell>
              <TableCell sx={{ color: (pos.currentPrice - pos.entryPrice) >= 0 ? '#2E7D32' : '#D32F2F' }}>
                ${(pos.currentPrice - pos.entryPrice) * pos.shares}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 2 }}>
        <Typography>Total Portfolio Value: ${totalValue.toFixed(2)}</Typography>
        <Typography sx={{ color: totalGainLoss >= 0 ? '#2E7D32' : '#D32F2F' }}>
          Total Gain/Loss: ${totalGainLoss.toFixed(2)}
        </Typography>
      </Box>
    </Container>
  );
};

export default PortfolioTracker;
