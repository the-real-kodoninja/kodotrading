import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface WatchlistProps {
  watchlist: string[];
  setWatchlist: (watchlist: string[]) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, setWatchlist }) => {
  const [watchlistPrices, setWatchlistPrices] = useState<{ [key: string]: { price: number; change: number } }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistPrices((prev) => {
        const updated: { [key: string]: { price: number; change: number } } = {};
        watchlist.forEach((ticker) => {
          const prevPrice = prev[ticker]?.price || 100;
          const newPrice = prevPrice + (Math.random() * 2 - 1);
          updated[ticker] = { price: newPrice, change: ((newPrice - prevPrice) / prevPrice) * 100 };
        });
        return updated;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [watchlist]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', color: '#E4E6EB' }}>Watchlist</Typography>
      {watchlist.length ? (
        watchlist.map((ticker) => (
          <Chip
            key={ticker}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>${ticker}</span>
                {watchlistPrices[ticker] && (
                  <>
                    <span>${watchlistPrices[ticker].price.toFixed(2)}</span>
                    <Typography
                      variant="caption"
                      sx={{ color: watchlistPrices[ticker].change >= 0 ? '#2E7D32' : '#D32F2F' }}
                    >
                      {watchlistPrices[ticker].change.toFixed(2)}%
                    </Typography>
                  </>
                )}
              </Box>
            }
            onDelete={() => setWatchlist(watchlist.filter((t) => t !== ticker))}
            sx={{ mr: 1, mb: 1, bgcolor: 'transparent', color: '#E4E6EB', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">Click a ticker to add to your watchlist</Typography>
      )}
    </Box>
  );
};

export default Watchlist;
