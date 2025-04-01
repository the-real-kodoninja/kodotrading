import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Link, TextField } from '@mui/material';
import { fetchNews } from '../api/mockNews';

const NewsTab: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [filterTicker, setFilterTicker] = useState('');

  useEffect(() => {
    fetchNews('').then(setNews);
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
        <Box key={i} sx={{ mt: 1 }}>
          <Typography>
            <Link href={item.url} target="_blank">{item.title}</Link> - {item.source} (${item.ticker})
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default NewsTab;