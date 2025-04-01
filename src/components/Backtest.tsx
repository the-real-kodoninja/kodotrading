import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, List, ListItem, ListItemText } from '@mui/material';

interface BacktestResult {
  strategy: string;
  profit: number;
  trades: number;
  winRate: number;
}

const Backtest: React.FC = () => {
  const [strategy, setStrategy] = useState('Sykes Penny Stock');
  const [results, setResults] = useState<BacktestResult[]>([]);

  const runBacktest = () => {
    // Mock backtest results
    const mockResult: BacktestResult = {
      strategy,
      profit: Math.random() * 1000 - 500, // Random profit/loss between -500 and 500
      trades: Math.floor(Math.random() * 100),
      winRate: Math.random() * 100,
    };
    setResults((prev) => [...prev, mockResult]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Backtest Strategies</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Strategy</InputLabel>
          <Select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            size="small"
          >
            <MenuItem value="Sykes Penny Stock">Sykes Penny Stock</MenuItem>
            <MenuItem value="Cameron Momentum">Cameron Momentum</MenuItem>
            <MenuItem value="Swing Trade">Swing Trade</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={runBacktest}>
          Run Backtest
        </Button>
      </Box>
      {results.length > 0 && (
        <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
          {results.map((result, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`${result.strategy}: Profit $${result.profit.toFixed(2)}`}
                secondary={`Trades: ${result.trades}, Win Rate: ${result.winRate.toFixed(2)}%`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Backtest;
