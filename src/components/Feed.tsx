import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, Typography, Container, TextField, Button } from '@mui/material';
import { fetchPosts, addPost } from '../api/mockApi';

interface Post {
  user: string;
  time: string;
  content: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [newPost, setNewPost] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchPosts(page, 5).then(setPosts);
  }, [page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const post: Post = {
      user: 'You', // Replace with auth username later
      time: 'Just now',
      content: newPost,
    };
    await addPost(post);
    setPosts((prev) => [post, ...prev]);
    setNewPost('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form onSubmit={handlePostSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          label="Share your trading thoughts"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
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