import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { fetchPosts } from '../api/mockApi';

const SentimentBar: React.FC = () => {
  const [sentiment, setSentiment] = useState<{ [ticker: string]: { bullish: number; bearish: number } }>({});

  useEffect(() => {
    fetchPosts(0, 100).then((posts) => {
      const tickerSentiment: { [ticker: string]: { bullish: number; bearish: number } } = {};
      posts.forEach((post) => {
        const tickers = (post.content.match(/\$([A-Z]{1,5})/g) || []).map((t) => t.slice(1));
        tickers.forEach((ticker) => {
          if (!tickerSentiment[ticker]) tickerSentiment[ticker] = { bullish: 0, bearish: 0 };
          if (post.sentiment === 'bullish') tickerSentiment[ticker].bullish += 1;
          if (post.sentiment === 'bearish') tickerSentiment[ticker].bearish += 1;
        });
      });
      setSentiment(tickerSentiment);
    });
  }, []);

  return (
    <Box sx={{ p: 2, backgroundColor: '#353839', color: '#FFFFFF', mb: 2 }}>
      <Typography variant="h6">Ticker Sentiment</Typography>
      {Object.entries(sentiment).map(([ticker, { bullish, bearish }]) => {
        const total = bullish + bearish;
        if (total === 0) return null;
        const bullPercent = (bullish / total) * 100;
        return (
          <Box key={ticker} sx={{ mt: 1 }}>
            <Typography variant="body2">${ticker}: {bullish} Bullish / {bearish} Bearish</Typography>
            <LinearProgress
              variant="determinate"
              value={bullPercent}
              sx={{ height: 8, bgcolor: 'red', '& .MuiLinearProgress-bar': { bgcolor: 'green' } }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default SentimentBar;
