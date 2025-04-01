import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface SimulatedTrade {
  id: number;
  ticker: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  profitLoss: number;
}

const TradeSimulator: React.FC = () => {
  const [trades, setTrades] = useState<SimulatedTrade[]>([]);
  const [newTrade, setNewTrade] = useState({
    ticker: '',
    type: 'buy' as 'buy' | 'sell',
    quantity: '',
    price: '',
  });

  const handleAddTrade = () => {
    if (!newTrade.ticker || !newTrade.quantity || !newTrade.price) return;
    const mockCurrentPrice = Math.random() * 100 + 50; // Simulate current price
    const profitLoss =
      newTrade.type === 'buy'
        ? (mockCurrentPrice - Number(newTrade.price)) * Number(newTrade.quantity)
        : (Number(newTrade.price) - mockCurrentPrice) * Number(newTrade.quantity);

    const trade: SimulatedTrade = {
      id: trades.length + 1,
      ticker: newTrade.ticker.toUpperCase(),
      type: newTrade.type,
      quantity: Number(newTrade.quantity),
      price: Number(newTrade.price),
      profitLoss,
    };
    setTrades((prev) => [...prev, trade]);
    setNewTrade({ ticker: '', type: 'buy', quantity: '', price: '' });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Trade Simulator
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
          <TextField
            label="Ticker"
            value={newTrade.ticker}
            onChange={(e) => setNewTrade((prev) => ({ ...prev, ticker: e.target.value }))}
            variant="outlined"
            size="small"
          />
          <Select
            value={newTrade.type}
            onChange={(e) => setNewTrade((prev) => ({ ...prev, type: e.target.value as 'buy' | 'sell' }))}
            size="small"
          >
            <MenuItem value="buy">Buy</MenuItem>
            <MenuItem value="sell">Sell</MenuItem>
          </Select>
          <TextField
            label="Quantity"
            type="number"
            value={newTrade.quantity}
            onChange={(e) => setNewTrade((prev) => ({ ...prev, quantity: e.target.value }))}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Price ($)"
            type="number"
            value={newTrade.price}
            onChange={(e) => setNewTrade((prev) => ({ ...prev, price: e.target.value }))}
            variant="outlined"
            size="small"
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddTrade}>
          Add Trade
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Entry Price</TableCell>
            <TableCell>Profit/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{trade.ticker}</TableCell>
              <TableCell>{trade.type.charAt(0).toUpperCase() + trade.type.slice(1)}</TableCell>
              <TableCell>{trade.quantity}</TableCell>
              <TableCell>${trade.price.toFixed(2)}</TableCell>
              <TableCell sx={{ color: trade.profitLoss >= 0 ? 'success.main' : 'error.main' }}>
                {trade.profitLoss >= 0 ? '+' : ''}${trade.profitLoss.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TradeSimulator;
