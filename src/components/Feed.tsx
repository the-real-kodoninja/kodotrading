import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Typography, TextField, Card, Box, IconButton, Button, Link,
} from '@mui/material';
import { ThumbUp, Comment } from '@mui/icons-material';
import { fetchPosts, addPost } from '../api/mockApi';
import { fetchNews } from '../api/mockNews';

interface Post {
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: string[];
  sentiment?: 'bullish' | 'bearish';
}

const mockChartData = (ticker: string) => ({
  time: [1711929600, 1712016000, 1712102400], // March 31 - April 2, 2025
  value: ticker === 'AAPL' ? [175, 178, 176] : ticker === 'TSLA' ? [420, 415, 430] : [2800, 2820, 2790],
});

const Feed: React.FC<{ username: string | null }> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [newPost, setNewPost] = useState('');
  const [filterTicker, setFilterTicker] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [showChart, setShowChart] = useState<{ [key: number]: string | null }>({});
  const [news, setNews] = useState<{ [key: number]: any[] }>({});
  const chartRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  useEffect(() => {
    Object.entries(showChart).forEach(([index, ticker]) => {
      if (ticker && chartRefs.current[Number(index)] && window.TradingView) {
        const chart = window.TradingView.createChart(chartRefs.current[Number(index)]!, {
          width: 300,
          height: 200,
          layout: { background: { type: 'solid', color: '#353839' }, textColor: '#FFFFFF' },
          grid: { vertLines: { color: '#424242' }, horzLines: { color: '#424242' } },
        });
        chart.addLineSeries({ color: '#8B0000' }).setData(
          mockChartData(ticker).time.map((t, i) => ({ time: t, value: mockChartData(ticker).value[i] }))
        );
      }
    });
  }, [showChart]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const sentiment = newPost.toLowerCase().includes('bull') ? 'bullish' : newPost.toLowerCase().includes('bear') ? 'bearish' : undefined;
    const post: Post = {
      user: username || 'Guest',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
      sentiment,
    };
    await addPost(post);
    setPosts((prev) => [post, ...prev]);
    setNewPost('');
  };

  const handleLike = (index: number) => {
    setPosts((prev) => prev.map((p, i) => (i === index ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleCommentSubmit = (index: number) => {
    const comment = commentInputs[index]?.trim();
    if (!comment) return;
    setPosts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, comments: [...p.comments, comment] } : p))
    );
    setCommentInputs((prev) => ({ ...prev, [index]: '' }));
  };

  const renderContentWithTickers = (content: string, index: number) => {
    const tickerRegex = /\$([A-Z]{1,5})/g;
    const parts = content.split(tickerRegex);
    return parts.map((part, i) =>
      tickerRegex.test(`$${part}`) ? (
        <Link
          key={i}
          href="#"
          onClick={async (e) => {
            e.preventDefault();
            setShowChart((prev) => ({ ...prev, [index]: part }));
            const newsItems = await fetchNews(part);
            setNews((prev) => ({ ...prev, [index]: newsItems }));
          }}
          sx={{ color: 'primary.main', cursor: 'pointer' }}
        >
          ${part}
        </Link>
      ) : (
        part
      )
    );
  };

  const filteredPosts = filterTicker
    ? posts.filter((post) => post.content.includes(filterTicker))
    : posts;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Filter by ticker (e.g., $AAPL)"
        value={filterTicker}
        onChange={(e) => setFilterTicker(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <form onSubmit={handlePostSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          label="Share your trading thoughts (e.g., $AAPL bullish)"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
      {filteredPosts.map((post, index) => (
        <Card key={index} sx={{ mb: 1, p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`https://ui-avatars.com/api/?name=${post.user}&background=8B0000&color=FFFFFF`}
              alt={post.user}
              style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>{post.user}</Typography>
            <Typography variant="caption" color="text.secondary">{post.time}</Typography>
          </Box>
          <Typography variant="body2">
            {renderContentWithTickers(post.content, index)}{' '}
            {post.sentiment && (
              <Typography component="span" sx={{ color: post.sentiment === 'bullish' ? 'green' : 'red', fontWeight: 600 }}>
                [{post.sentiment}]
              </Typography>
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => handleLike(index)} size="small">
              <ThumbUp fontSize="small" /> {post.likes}
            </IconButton>
            <IconButton size="small">
              <Comment fontSize="small" /> {post.comments.length}
            </IconButton>
          </Box>
          {post.comments.map((comment, cIndex) => (
            <Typography key={cIndex} variant="body2" sx={{ mt: 1, ml: 2 }}>
              {renderContentWithTickers(comment, index)}
            </Typography>
          ))}
          <Box sx={{ mt: 1 }}>
            <TextField
              size="small"
              placeholder="Add a comment"
              value={commentInputs[index] || ''}
              onChange={(e) => setCommentInputs((prev) => ({ ...prev, [index]: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(index)}
              sx={{ width: '70%' }}
            />
            <Button size="small" onClick={() => handleCommentSubmit(index)} sx={{ ml: 1 }}>
              Comment
            </Button>
          </Box>
        </Card>
      ))}
      <div ref={loadMoreRef} style={{ height: '20px' }} />
    </Container>
  );
};

export default Feed;