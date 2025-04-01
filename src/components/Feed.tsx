import React from 'react';
import { Card, CardContent, CardHeader, Typography, Container } from '@mui/material';

const posts = [
  { user: 'TraderX', time: '2h ago', content: 'Bullish on $AAPL!' },
  { user: 'StockGuru', time: '5h ago', content: 'Market looking shaky today.' },
];

const Feed: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 2 }}>
    {posts.map((post, index) => (
      <Card key={index} sx={{ mb: 2 }}>
        <CardHeader
          title={post.user}
          subheader={post.time}
        />
        <CardContent>
          <Typography>{post.content}</Typography>
        </CardContent>
      </Card>
    ))}
  </Container>
);

export default Feed;
