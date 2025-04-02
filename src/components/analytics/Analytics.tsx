import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { fetchPosts } from '../api/mockApi';

interface SentimentTrend {
  ticker: string;
  bullish: number;
  bearish: number;
}

const Analytics: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [sentimentTrends, setSentimentTrends] = useState<SentimentTrend[]>([]);

  useEffect(() => {
    fetchPosts(0, 100).then((posts) => {
      const trends: { [ticker: string]: { bullish: number; bearish: number } } = {};
      posts.forEach((post) => {
        const tickers = (post.content.match(/\$([A-Z]{1,5})/g) || []).map((t) => t.slice(1));
        tickers.forEach((ticker) => {
          if (!trends[ticker]) trends[ticker] = { bullish: 0, bearish: 0 };
          if (post.sentiment === 'bullish') trends[ticker].bullish += 1;
          if (post.sentiment === 'bearish') trends[ticker].bearish += 1;
        });
      });
      setSentimentTrends(
        Object.entries(trends).map(([ticker, data]) => ({ ticker, ...data }))
      );
    });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Advanced Analytics</Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Sentiment Trends" />
        <Tab label="Portfolio Insights" />
      </Tabs>
      {tab === 0 && (
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1">Sentiment Trends</Typography>
          {sentimentTrends.map((trend) => (
            <Box key={trend.ticker} sx={{ mt: 1 }}>
              <Typography variant="body2">
                ${trend.ticker}: {trend.bullish} Bullish / {trend.bearish} Bearish
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1">Portfolio Insights</Typography>
          <Typography variant="body2" color="text.secondary">
            (Mock) Top Performer: $AAPL (+5%)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            (Mock) Biggest Loser: $TSLA (-2%)
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Analytics;
