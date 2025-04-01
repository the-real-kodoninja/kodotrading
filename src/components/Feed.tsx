import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField } from '@mui/material';
import { fetchPosts } from '../api/mockApi';
import PostForm from './PostForm';
import PostCard from './PostCard';
import Watchlist from './Watchlist';
import RuleWarnings from './RuleWarnings';

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

const Feed: React.FC<{ username: string | null }> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [filterTicker, setFilterTicker] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [ruleWarnings, setRuleWarnings] = useState<string[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mockPosts: Post[] = [
      ...fetchPosts(page, 5),
      {
        id: 100,
        user: 'NFTCollector',
        time: '1h ago',
        content: 'Just minted this awesome NFT!',
        likes: 5,
        comments: [],
        shares: 0,
        nft: {
          name: 'CryptoPunk #123',
          image: 'https://via.placeholder.com/150',
          details: [
            { trait: 'Hat', value: 'Beanie' },
            { trait: 'Eyes', value: 'Sunglasses' },
            { trait: 'Rarity', value: 'Rare' },
          ],
        },
      },
      {
        id: 101,
        user: 'MarketBot',
        time: '30m ago',
        content: '',
        likes: 0,
        comments: [],
        shares: 0,
        priceUpdate: { symbol: 'BTC', price: 60000, change: 1.5, type: 'crypto' },
      },
    ];
    setPosts((prev) => [
      ...prev,
      ...mockPosts.map((p, i) => ({ ...p, id: prev.length + i, shares: p.shares || 0 })),
    ]);
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

  const filteredPosts = filterTicker ? posts.filter((post) => post.content.includes(filterTicker)) : posts;

  return (
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
  );
};

export default Feed;