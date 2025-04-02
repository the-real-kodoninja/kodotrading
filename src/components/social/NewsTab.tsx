import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Card, CardContent, CardMedia, Link } from '@mui/material';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  source: string;
  timestamp: string;
  category: 'General' | 'Earnings' | 'M&A' | 'Analyst';
  image?: string;
}

const NewsTab: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const mockNews: NewsArticle[] = [
      {
        id: 1,
        title: 'Apple Reports Record Q1 Earnings',
        description: 'Apple announced a record-breaking Q1 with strong iPhone sales.',
        source: 'CNBC',
        timestamp: '1h ago',
        category: 'Earnings',
        image: 'https://via.placeholder.com/300x150?text=Apple+Earnings',
      },
      {
        id: 2,
        title: 'Tesla to Acquire Battery Startup',
        description: 'Tesla is in talks to acquire a battery technology startup to boost EV production.',
        source: 'Bloomberg',
        timestamp: '3h ago',
        category: 'M&A',
      },
      {
        id: 3,
        title: 'Analyst Upgrades $AAPL to Buy',
        description: 'A top analyst has upgraded Apple stock to Buy with a $200 target.',
        source: 'Reuters',
        timestamp: '5h ago',
        category: 'Analyst',
      },
    ];
    setNews(mockNews);
  }, []);

  const filteredNews = news.filter((article) => {
    if (tab === 0) return true;
    if (tab === 1) return article.category === 'General';
    if (tab === 2) return article.category === 'Earnings';
    if (tab === 3) return article.category === 'M&A';
    if (tab === 4) return article.category === 'Analyst';
    return false;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Market News
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="General" />
        <Tab label="Earnings" />
        <Tab label="M&A" />
        <Tab label="Analyst" />
      </Tabs>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredNews.map((article) => (
          <Card key={article.id} sx={{ display: 'flex', bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            {article.image && (
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={article.image}
                alt={article.title}
              />
            )}
            <CardContent>
              <Typography variant="body1">{article.title}</Typography>
              <Typography variant="body2" color="text.secondary">{article.description}</Typography>
              <Typography variant="caption" color="text.secondary">
                {article.source} • {article.timestamp}
              </Typography>
            </CardContent>
        </Card>
        ))}
      </Box>
    </Container>
  );
};

export default NewsTab;