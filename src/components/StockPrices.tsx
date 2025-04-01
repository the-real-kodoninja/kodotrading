import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

interface StockPrice {
  ticker: string;
  price: number;
  change: number;
}

const StockPrices: React.FC = () => {
  const [prices, setPrices] = useState<StockPrice[]>([
    { ticker: 'AAPL', price: 178, change: 0 },
    { ticker: 'TSLA', price: 415, change: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((stock) => ({
          ...stock,
          price: stock.price + (Math.random() * 2 - 1),
          change: Math.random() * 2 - 1,
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Real-Time Stock Prices</Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
        {prices.map((stock) => (
          <ListItem key={stock.ticker}>
            <ListItemText
              primary={`$${stock.ticker}: $${stock.price.toFixed(2)}`}
              secondary={`Change: ${stock.change.toFixed(2)}%`}
              secondaryTypographyProps={{ color: stock.change >= 0 ? '#2E7D32' : '#D32F2F' }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StockPrices;
