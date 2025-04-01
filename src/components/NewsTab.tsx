import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Link, TextField } from '@mui/material';
import { fetchNews } from '../api/mockNews';

interface NewsItem {
  title: string;
  source: string;
  url: string;
  ticker: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

const NewsTab: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filterTicker, setFilterTicker] = useState('');

  useEffect(() => {
    fetchNews('').then((items) =>
      setNews(
        items.map((item: NewsItem) => ({
          ...item,
          sentiment: item.title.toLowerCase().includes('beats') ? 'positive' : item.title.toLowerCase().includes('recalls') ? 'negative' : 'neutral',
        }))
      )
    );
  }, []);

  const filteredNews = filterTicker
    ? news.filter((item) => item.ticker === filterTicker.replace('$', ''))
    : news;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Latest Market News</Typography>
      <TextField
        fullWidth
        label="Filter by ticker (e.g., $AAPL)"
        value={filterTicker}
        onChange={(e) => setFilterTicker(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      {filteredNews.map((item, i) => (
        <Box key={i} sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            <Link href={item.url} target="_blank">{item.title}</Link> - {item.source} (${item.ticker})
          </Typography>
          <Typography sx={{ color: item.sentiment === 'positive' ? '#2E7D32' : item.sentiment === 'negative' ? '#D32F2F' : 'text.secondary' }}>
            {item.sentiment}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default NewsTab;