import React, { useState, useEffect, useRef } from 'react';
import {
  Card, CardContent, CardHeader, Typography, Container, TextField, Button, IconButton, Box,
} from '@mui/material';
import { ThumbUp, Comment } from '@mui/icons-material';
import { fetchPosts, addPost } from '../api/mockApi';

interface Post {
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: string[];
}

const Feed: React.FC<{ username: string | null }> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchPosts(page, 5).then((fetchedPosts) =>
      setPosts((prev) => [
        ...prev,
        ...fetchedPosts.map((p) => ({ ...p, likes: 0, comments: [] })),
      ])
    );
  }, [page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
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
      user: username || 'Guest',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
    };
    await addPost(post);
    setPosts((prev) => [post, ...prev]);
    setNewPost('');
  };

  const handleLike = (index: number) => {
    setPosts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCommentSubmit = (index: number) => {
    const comment = commentInputs[index]?.trim();
    if (!comment) return;
    setPosts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [index]: '' }));
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
            <Box sx={{ mt: 1 }}>
              <IconButton onClick={() => handleLike(index)} size="small">
                <ThumbUp fontSize="small" /> {post.likes}
              </IconButton>
              <IconButton size="small">
                <Comment fontSize="small" /> {post.comments.length}
              </IconButton>
            </Box>
            {post.comments.map((comment, cIndex) => (
              <Typography key={cIndex} variant="body2" sx={{ mt: 1, ml: 2 }}>
                {comment}
              </Typography>
            ))}
            <Box sx={{ mt: 1 }}>
              <TextField
                size="small"
                placeholder="Add a comment"
                value={commentInputs[index] || ''}
                onChange={(e) =>
                  setCommentInputs((prev) => ({ ...prev, [index]: e.target.value }))
                }
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(index)}
                sx={{ width: '70%' }}
              />
              <Button
                size="small"
                onClick={() => handleCommentSubmit(index)}
                sx={{ ml: 1 }}
              >
                Comment
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
      <div ref={loadMoreRef} style={{ height: '20px' }} />
    </Container>
  );
};

export default Feed;