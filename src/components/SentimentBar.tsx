import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const SentimentBar: React.FC = () => {
  const sentiments = [
    { ticker: '$AAPL', bullish: 1, bearish: 0, score: 0.20 },
    { ticker: '$TSLA', bullish: 0, bearish: 1, score: 1.00 },
  ];

  return (
    <Box sx={{ bgcolor: '#242526', p: 1, borderRadius: 2, mb: 2, mx: 2 }}>
      <Typography variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>
        TICKER SENTIMENT
      </Typography>
      {sentiments.map((sentiment, index) => (
        <Box key={index}>
          <Link to={`/stock/${sentiment.ticker.replace('$', '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: sentiment.score > 0 ? '#FF0000' : '#00FF00' }}>
              {sentiment.ticker}: {sentiment.bullish} Bullish / {sentiment.bearish} Bearish | Sentiment Score: {sentiment.score.toFixed(2)}
            </Typography>
          </Link>
          {index < sentiments.length - 1 && <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
        </Box>
      ))}
    </Box>
  );
};

export default SentimentBar;