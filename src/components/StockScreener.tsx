import React, { useState } from 'react';
import { Container, Typography, TextField, Box, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Stock {
  ticker: string;
  price: number;
  volume: number;
  volatility: number;
  pattern?: string;
}

const StockScreener: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minVolume, setMinVolume] = useState<number>(0);
  const [minVolatility, setMinVolatility] = useState<number>(0);
  const [tradingStyle, setTradingStyle] = useState<string>('all');
  const [stocks] = useState<Stock[]>([
    { ticker: 'AAPL', price: 178, volume: 1000000, volatility: 3 },
    { ticker: 'TSLA', price: 415, volume: 2000000, volatility: 5 },
    { ticker: 'PENY', price: 0.5, volume: 600000, volatility: 6, pattern: 'Breakout' },
  ]);

  const filteredStocks = stocks.filter((stock) => {
    const priceMatch = stock.price >= minPrice && stock.price <= maxPrice;
    const volumeMatch = stock.volume >= minVolume;
    const volatilityMatch = stock.volatility >= minVolatility;
    const styleMatch =
      tradingStyle === 'all' ||
      (tradingStyle === 'penny' && stock.price <= 5) ||
      (tradingStyle === 'swing' && stock.volatility < 5) ||
      (tradingStyle === 'day' && stock.volatility >= 5);
    return priceMatch && volumeMatch && volatilityMatch && styleMatch;
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Stock Screener</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
        <TextField
          label="Min Volume"
          type="number"
          value={minVolume}
          onChange={(e) => setMinVolume(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
        <TextField
          label="Min Volatility (%)"
          type="number"
          value={minVolatility}
          onChange={(e) => setMinVolatility(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
        <FormControl sx={{ width: 120 }}>
          <InputLabel>Trading Style</InputLabel>
          <Select
            value={tradingStyle}
            onChange={(e) => setTradingStyle(e.target.value)}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="penny">Penny Stocks</MenuItem>
            <MenuItem value="swing">Swing</MenuItem>
            <MenuItem value="day">Day Trading</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
        {filteredStocks.map((stock) => (
          <ListItem key={stock.ticker}>
            <ListItemText
              primary={`$${stock.ticker}: $${stock.price}`}
              secondary={`Volume: ${stock.volume}, Volatility: ${stock.volatility}%${stock.pattern ? `, Pattern: ${stock.pattern}` : ''}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StockScreener;