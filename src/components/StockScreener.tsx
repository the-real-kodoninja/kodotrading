import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, List, ListItem } from '@mui/material';

// Mock Motoko-like decentralized screener
const mockScreenStocks = (criteria: { minPrice: number; maxVolatility: number }) => {
  const stocks = [
    { ticker: 'AAPL', price: 178, volatility: 0.02 },
    { ticker: 'TSLA', price: 415, volatility: 0.05 },
    { ticker: 'GOOG', price: 2820, volatility: 0.01 },
  ];
  return stocks.filter((s) => s.price >= criteria.minPrice && s.volatility <= criteria.maxVolatility);
};

const StockScreener: React.FC = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxVolatility, setMaxVolatility] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleScreen = () => {
    const criteria = { minPrice: Number(minPrice) || 0, maxVolatility: Number(maxVolatility) || 1 };
    const screened = mockScreenStocks(criteria);
    setResults(screened);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Decentralized Stock Screener (Motoko Simulation)</Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Max Volatility"
          value={maxVolatility}
          onChange={(e) => setMaxVolatility(e.target.value)}
          type="number"
        />
        <Button onClick={handleScreen} variant="contained" sx={{ mt: 1 }}>Screen Stocks</Button>
      </Box>
      <List>
        {results.map((stock) => (
          <ListItem key={stock.ticker}>
            ${stock.ticker} - Price: ${stock.price}, Volatility: {stock.volatility}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StockScreener;
