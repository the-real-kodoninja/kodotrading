import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Typography, TextField, Card, Box, IconButton, Button, Link, Chip, Menu, MenuItem,
} from '@mui/material';
import { ThumbUp, Comment, Share, Delete, EmojiEmotions } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fetchPosts, addPost } from '../api/mockApi';
import { fetchNews } from '../api/mockNews';

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
}

const Feed: React.FC<{ username: string | null }> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [newPost, setNewPost] = useState('');
  const [filterTicker, setFilterTicker] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [showChart, setShowChart] = useState<{ [key: number]: string | null }>({});
  const [news, setNews] = useState<{ [key: number]: any[] }>({});
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);
  const [sharePostId, setSharePostId] = useState<number | null>(null);
  const chartRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts(page, 5).then((fetchedPosts) =>
      setPosts((prev) => [
        ...prev,
        ...fetchedPosts.map((p, i) => ({ ...p, id: prev.length + i, shares: 0 })),
      ])
    );
  }, [page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setPage((prev) => prev + 1),
      { threshold: 1.0 }
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const sentiment = newPost.toLowerCase().includes('bull') ? 'bullish' : newPost.toLowerCase().includes('bear') ? 'bearish' : undefined;
    const media = fileInputRef.current?.files?.[0]
      ? { type: fileInputRef.current.files[0].type.startsWith('video') ? 'video' : 'photo', url: URL.createObjectURL(fileInputRef.current.files[0]) }
      : undefined;
    const post: Post = {
      id: posts.length,
      user: username || 'Guest',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
      shares: 0,
      sentiment,
      media,
    };
    await addPost(post);
    setPosts((prev) => [post, ...prev]);
    setNewPost('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLike = (id: number) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  const handleShare = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    setSharePostId(id);
    setShareAnchorEl(event.currentTarget);
  };
  const handleShareClose = () => {
    setShareAnchorEl(null);
    setSharePostId(null);
  };
  const handleShareAction = (platform: 'twitter' | 'email') => {
    const post = posts.find((p) => p.id === sharePostId);
    if (!post) return;
    const shareText = `${post.user}: ${post.content} via KodoTrading`;
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    } else if (platform === 'email') {
      shareUrl = `mailto:?subject=Check out this post on KodoTrading&body=${encodeURIComponent(shareText)}`;
    }
    window.open(shareUrl, '_blank');
    setPosts((prev) => prev.map((p) => (p.id === sharePostId ? { ...p, shares: p.shares + 1 } : p)));
    handleShareClose();
  };
  const handleDelete = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id));
  const handleCommentSubmit = (id: number) => {
    const comment = commentInputs[id]?.trim();
    if (!comment) return;
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comments: [...p.comments, comment] } : p)));
    setCommentInputs((prev) => ({ ...prev, [id]: '' }));
  };
  const addToWatchlist = (ticker: string) => setWatchlist((prev) => [...new Set([...prev, ticker])]);

  const renderContentWithTags = (content: string) => {
    const tagRegex = /@([A-Za-z0-9_]+)/g;
    const parts = content.split(tagRegex);
    return parts.map((part, i) =>
      tagRegex.test(`@${part}`) ? (
        <Link key={i} href={`/profile/${part}`} sx={{ color: 'primary.main', cursor: 'pointer' }}>
          @{part}
        </Link>
      ) : (
        part
      )
    );
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
            addToWatchlist(part);
          }}
          sx={{ color: 'primary.main', cursor: 'pointer' }}
        >
          ${part}
        </Link>
      ) : (
        renderContentWithTags(part)
      )
    );
  };

  const filteredPosts = filterTicker ? posts.filter((post) => post.content.includes(filterTicker)) : posts;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Watchlist</Typography>
        {watchlist.length ? (
          watchlist.map((ticker) => (
            <Chip
              key={ticker}
              label={`$${ticker}`}
              onDelete={() => setWatchlist((prev) => prev.filter((t) => t !== ticker))}
              sx={{ mr: 1, mb: 1, bgcolor: isDarkMode ? '#3A3B3C' : '#E4E6EB' }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">Click a ticker to add to your watchlist</Typography>
        )}
      </Box>
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
        <input type="file" ref={fileInputRef} accept="image/*,video/*" style={{ marginBottom: 8 }} />
        <Button type="submit" variant="contained" color="primary">Post</Button>
      </form>
      {filteredPosts.map((post) => (
        <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <motion.img
                  src={`https://ui-avatars.com/api/?name=${post.user}&background=8B0000&color=FFFFFF`}
                  alt={post.user}
                  style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {post.user} <Typography component="span" variant="caption" color="text.secondary">(Trader)</Typography>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{post.time}</Typography>
                </Box>
              </Box>
              {post.user === username && <IconButton onClick={() => handleDelete(post.id)}><Delete fontSize="small" /></IconButton>}
            </Box>
            <Typography variant="body1">{renderContentWithTickers(post.content, post.id)}</Typography>
            {post.sentiment && (
              <Typography component="span" sx={{ color: post.sentiment === 'bullish' ? '#2E7D32' : '#D32F2F', fontWeight: 600, fontSize: '0.9rem' }}>
                [{post.sentiment}]
              </Typography>
            )}
            {post.media && (
              post.media.type === 'photo' ? <img src={post.media.url} alt="Post media" style={{ maxWidth: '100%', borderRadius: 8, mt: 1 }} /> :
              <video src={post.media.url} controls style={{ maxWidth: '100%', borderRadius: 8, mt: 1 }} />
            )}
            {showChart[post.id] && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Chart for ${showChart[post.id]} (Disabled due to error)</Typography>
                <Button onClick={() => setShowChart((prev) => ({ ...prev, [post.id]: null }))} sx={{ mt: 1 }}>Hide Chart</Button>
              </Box>
            )}
            {news[post.id] && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">News for ${showChart[post.id]}</Typography>
                {news[post.id].map((item, i) => (
                  <Typography key={i} variant="body2">
                    <Link href={item.url} target="_blank">{item.title}</Link> - {item.source}
                  </Typography>
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 1, mt: 1, color: 'text.secondary' }}>
              <IconButton onClick={() => handleLike(post.id)}><ThumbUp fontSize="small" /> {post.likes}</IconButton>
              <IconButton><Comment fontSize="small" /> {post.comments.length}</IconButton>
              <IconButton onClick={(e) => handleShare(post.id, e)}><Share fontSize="small" /> {post.shares}</IconButton>
              <IconButton><EmojiEmotions fontSize="small" /></IconButton>
            </Box>
            <Menu anchorEl={shareAnchorEl} open={Boolean(shareAnchorEl)} onClose={handleShareClose}>
              <MenuItem onClick={() => handleShareAction('twitter')}>Share to Twitter</MenuItem>
              <MenuItem onClick={() => handleShareAction('email')}>Share via Email</MenuItem>
            </Menu>
            {post.comments.map((comment, cIndex) => (
              <Typography key={cIndex} variant="body2" sx={{ mt: 1, ml: 2, color: 'text.secondary' }}>
                {renderContentWithTickers(comment, post.id)}
              </Typography>
            ))}
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Add a comment"
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                sx={{ flexGrow: 1 }}
              />
              <Button size="small" onClick={() => handleCommentSubmit(post.id)}>Comment</Button>
            </Box>
          </Card>
        </motion.div>
      ))}
      <div ref={loadMoreRef} style={{ height: '20px' }} />
    </Container>
  );
};

export default Feed;