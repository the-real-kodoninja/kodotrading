import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const SentimentBar: React.FC = () => {
  const [sentiments, setSentiments] = useState([
    { ticker: 'AAPL', bullish: 1, bearish: 0, sentimentScore: 0.8 },
    { ticker: 'TSLA', bullish: 0, bearish: 1, sentimentScore: -0.5 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSentiments((prev) =>
        prev.map((item) => ({
          ...item,
          sentimentScore: Math.random() * 2 - 1, // Mock NLP sentiment score (-1 to 1)
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Ticker Sentiment</Typography>
      {sentiments.map((item) => (
        <Box key={item.ticker} sx={{ mb: 1 }}>
          <Typography variant="body2">
            ${item.ticker}: {item.bullish} Bullish / {item.bearish} Bearish
            <Typography component="span" sx={{ ml: 1, color: item.sentimentScore >= 0 ? '#2E7D32' : '#D32F2F' }}>
              Sentiment Score: {item.sentimentScore.toFixed(2)}
            </Typography>
          </Typography>
          <Box sx={{ height: 5, bgcolor: item.sentimentScore >= 0 ? '#2E7D32' : '#D32F2F', borderRadius: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default SentimentBar;