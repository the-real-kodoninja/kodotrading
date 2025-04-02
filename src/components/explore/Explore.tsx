import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Card, CardContent, CardMedia } from '@mui/material';

interface TrendingItem {
  id: number;
  type: 'post' | 'nft' | 'video';
  title: string;
  description: string;
  image?: string;
}

const Explore: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);

  useEffect(() => {
    const mockItems: TrendingItem[] = [
      { id: 1, type: 'post', title: 'Top $AAPL Analysis', description: 'TraderX shares insights on Apple’s stock.' },
      { id: 2, type: 'nft', title: 'CryptoPunk #123', description: 'Rare NFT trending now!', image: 'https://via.placeholder.com/150' },
      { id: 3, type: 'video', title: 'Live $BTC Stream', description: 'Join the live Bitcoin analysis.' },
    ];
    setTrendingItems(mockItems);
  }, []);

  const filteredItems = trendingItems.filter((item) => {
    if (tab === 0) return true;
    if (tab === 1) return item.type === 'post';
    if (tab === 2) return item.type === 'nft';
    if (tab === 3) return item.type === 'video';
    return false;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Explore KodoTrading
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="Posts" />
        <Tab label="NFTs" />
        <Tab label="Videos" />
      </Tabs>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {filteredItems.map((item) => (
          <Card key={item.id} sx={{ width: 200, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            {item.image && <CardMedia component="img" height="140" image={item.image} alt={item.title} />}
            <CardContent>
              <Typography variant="body1">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Explore;
