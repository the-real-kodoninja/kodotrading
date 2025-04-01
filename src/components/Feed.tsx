import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, Typography, Container } from '@mui/material';

const generatePosts = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    user: `Trader${start + i}`,
    time: `${i + 1}h ago`,
    content: `Post #${start + i + 1}: $${['AAPL', 'TSLA', 'GOOG'][i % 3]} analysis`,
  }));

const Feed: React.FC = () => {
  const [posts, setPosts] = useState(generatePosts(0, 5));
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPosts((prev) => [...prev, ...generatePosts(page * 5, 5)]);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      {posts.map((post, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardHeader title={post.user} subheader={post.time} />
          <CardContent>
            <Typography>{post.content}</Typography>
          </CardContent>
        </Card>
      ))}
      <div ref={loadMoreRef} style={{ height: '20px' }} />
    </Container>
  );
};

export default Feed;