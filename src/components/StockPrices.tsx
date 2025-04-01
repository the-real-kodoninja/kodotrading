import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

interface Price {
  symbol: string;
  price: number;
  change: number;
  type: 'stock' | 'crypto';
}

const StockPrices: React.FC = () => {
  const [prices, setPrices] = useState<Price[]>([
    { symbol: 'AAPL', price: 178, change: 0, type: 'stock' },
    { symbol: 'TSLA', price: 415, change: 0, type: 'stock' },
    { symbol: 'BTC', price: 60000, change: 0, type: 'crypto' },
    { symbol: 'ETH', price: 3000, change: 0, type: 'crypto' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() * (item.type === 'crypto' ? 100 : 2) - (item.type === 'crypto' ? 50 : 1)),
          change: Math.random() * 2 - 1,
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Real-Time Prices</Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
        {prices.map((item) => (
          <ListItem key={item.symbol}>
            <ListItemText
              primary={`${item.type === 'crypto' ? '' : '$'}${item.symbol}: $${item.price.toFixed(2)}`}
              secondary={`Change: ${item.change.toFixed(2)}%`}
              secondaryTypographyProps={{ color: item.change >= 0 ? '#2E7D32' : '#D32F2F' }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StockPrices;