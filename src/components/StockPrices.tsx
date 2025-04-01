import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

interface Price {
  symbol: string;
  price: number;
  change: number;
  type: 'stock' | 'crypto';
  level2?: { bids: { price: number; size: number }[]; asks: { price: number; size: number }[] };
}

const StockPrices: React.FC = () => {
  const [prices, setPrices] = useState<Price[]>([
    { symbol: 'AAPL', price: 178, change: 0, type: 'stock', level2: { bids: [], asks: [] } },
    { symbol: 'TSLA', price: 415, change: 0, type: 'stock', level2: { bids: [], asks: [] } },
    { symbol: 'BTC', price: 60000, change: 0, type: 'crypto', level2: { bids: [], asks: [] } },
    { symbol: 'ETH', price: 3000, change: 0, type: 'crypto', level2: { bids: [], asks: [] } },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((item) => {
          const newPrice = item.price + (Math.random() * (item.type === 'crypto' ? 100 : 2) - (item.type === 'crypto' ? 50 : 1));
          return {
            ...item,
            price: newPrice,
            change: Math.random() * 2 - 1,
            level2: {
              bids: Array.from({ length: 3 }, (_, i) => ({
                price: newPrice - (i + 1) * 0.1,
                size: Math.floor(Math.random() * 1000),
              })),
              asks: Array.from({ length: 3 }, (_, i) => ({
                price: newPrice + (i + 1) * 0.1,
                size: Math.floor(Math.random() * 1000),
              })),
            },
          };
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Real-Time Prices</Typography>
      {prices.map((item) => (
        <Box key={item.symbol} sx={{ mb: 2 }}>
          <Typography variant="body1">
            {item.type === 'crypto' ? '' : '$'}{item.symbol}: ${item.price.toFixed(2)}
            <Typography component="span" sx={{ ml: 1, color: item.change >= 0 ? '#2E7D32' : '#D32F2F' }}>
              {item.change.toFixed(2)}%
            </Typography>
          </Typography>
          {item.level2 && (
            <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Bids</Typography>
                {item.level2.bids.map((bid, i) => (
                  <Typography key={i} variant="body2">
                    ${bid.price.toFixed(2)} - {bid.size} shares
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Asks</Typography>
                {item.level2.asks.map((ask, i) => (
                  <Typography key={i} variant="body2">
                    ${ask.price.toFixed(2)} - {ask.size} shares
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default StockPrices;