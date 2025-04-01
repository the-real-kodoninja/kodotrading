import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, Tabs, Tab, Typography } from '@mui/material';
import { fetchPosts } from '../api/mockApi';
import PostForm from './feed/PostForm';
import PostCard from './feed/PostCard';
import Watchlist from './feed/Watchlist';
import RuleWarnings from './feed/RuleWarnings';

interface Post {
  id: number;
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: string[];
  shares: number;
  sentiment?: 'bullish' | 'bearish';
  media?: { type: 'photo' | 'video' | 'stock'; url: string };
  nft?: { name: string; image: string; details: { trait: string; value: string }[] };
  priceUpdate?: { symbol: string; price: number; change: number; type: 'stock' | 'crypto' };
  tradeSettings?: { stopLoss: number; takeProfit: number; trailingStop: boolean };
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography color="error">
          Something went wrong in the Feed. Please try again later. Error: {this.state.error?.message}
        </Typography>
      );
    }
    return this.props.children;
  }
}

const Feed: React.FC<{ username: string | null }> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [filterTicker, setFilterTicker] = useState('');
  const [filterType, setFilterType] = useState(0);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [ruleWarnings, setRuleWarnings] = useState<string[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const fetchedPosts = fetchPosts(page, 5);
      console.log('Fetched posts:', fetchedPosts);
      setPosts((prev) => [
        ...prev,
        ...fetchedPosts.map((p, i) => ({ ...p, id: prev.length + i, shares: p.shares || 0 })),
      ]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }, [page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setPage((prev) => prev + 1),
      { threshold: 1.0 }
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  const handlePostSubmit = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const handleLike = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCommentSubmit = (id: number, comment: string) => {
    if (!comment.trim()) return;
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comments: [...p.comments, comment] } : p)));
  };

  const handleShare = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, shares: p.shares + 1 } : p)));
  };

  const addToWatchlist = (ticker: string) => {
    setWatchlist((prev) => [...new Set([...prev, ticker])]);
  };

  const filteredPosts = posts
    .filter((post) => (filterTicker ? post.content.includes(filterTicker) : true))
    .filter((post) => {
      if (filterType === 0) return true;
      if (filterType === 1) return post.media?.type === 'photo';
      if (filterType === 2) return post.media?.type === 'video';
      if (filterType === 3) return !!post.nft;
      if (filterType === 4) return !!post.priceUpdate;
      return false;
    });

  return (
    <ErrorBoundary>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
        <TextField
          fullWidth
          placeholder="Filter by ticker (e.g., $AAPL)"
          value={filterTicker}
          onChange={(e) => setFilterTicker(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Tabs value={filterType} onChange={(e, newValue) => setFilterType(newValue)} sx={{ mb: 2 }}>
          <Tab label="All" />
          <Tab label="Photos" />
          <Tab label="Videos" />
          <Tab label="NFTs" />
          <Tab label="Price Updates" />
        </Tabs>
        <PostForm username={username} onPostSubmit={handlePostSubmit} setRuleWarnings={setRuleWarnings} />
        <RuleWarnings warnings={ruleWarnings} />
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            username={username}
            onLike={handleLike}
            onDelete={handleDelete}
            onCommentSubmit={handleCommentSubmit}
            onShare={handleShare}
            addToWatchlist={addToWatchlist}
          />
        ))}
        <div ref={loadMoreRef} style={{ height: '20px' }} />
      </Container>
    </ErrorBoundary>
  );
};

export default Feed;