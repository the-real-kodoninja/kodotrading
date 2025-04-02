import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import PostForm from './PostForm';
import PostCard from './PostCard';
import Watchlist from './Watchlist';
import RuleWarnings from './RuleWarnings';
import { getPosts, createPost } from '../../services/api';
import { containerStyle, typographyHeaderStyle } from '../../assets/styles/styles';

interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  image?: string;
  video?: string;
  stock?: string;
}

interface FeedProps {
  username: string | null;
}

const Feed: React.FC<FeedProps> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts();
        // Add mock media to some posts for testing
        const enhancedPosts = fetchedPosts.map((post, index) => {
          if (index === 0) {
            return {
              ...post,
              image: 'https://via.placeholder.com/300', // Mock image
            };
          }
          if (index === 1) {
            return {
              ...post,
              video: 'https://www.w3schools.com/html/mov_bbb.mp4', // Mock video
            };
          }
          if (index === 2) {
            return {
              ...post,
              stock: 'AAPL', // Mock stock ticker
            };
          }
          return post;
        });
        setPosts(enhancedPosts);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = async (content: string) => {
    if (!username) return;

    try {
      const newPost = await createPost(content, username);
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Feed
      </Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {username ? (
        <PostForm onSubmit={handleNewPost} />
      ) : (
        <Typography sx={{ mb: 2 }}>Please log in to post.</Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Box sx={{ flex: 3 }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : posts.length === 0 ? (
            <Typography>No posts available.</Typography>
          ) : (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Watchlist />
          <RuleWarnings />
        </Box>
      </Box>
    </Container>
  );
};

export default Feed;