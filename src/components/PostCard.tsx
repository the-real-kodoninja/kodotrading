import React, { useState } from 'react';
import {
  Card, Box, Typography, IconButton, Link, Button, TextField, Menu, MenuItem,
} from '@mui/material';
import { ThumbUp, Comment, Share, Delete, EmojiEmotions } from '@mui/icons-material';
import { motion } from 'framer-motion';
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
  nft?: { name: string; image: string; details: { trait: string; value: string }[] };
  priceUpdate?: { symbol: string; price: number; change: number; type: 'stock' | 'crypto' };
  tradeSettings?: { stopLoss: number; takeProfit: number; trailingStop: boolean };
}

interface PostCardProps {
  post: Post;
  username: string | null;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onCommentSubmit: (id: number, comment: string) => void;
  onShare: (id: number) => void;
  addToWatchlist: (ticker: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  username,
  onLike,
  onDelete,
  onCommentSubmit,
  onShare,
  addToWatchlist,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [showChart, setShowChart] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);

  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const handleShareAction = (platform: 'twitter' | 'email') => {
    const shareText = `${post.user}: ${post.content} via KodoTrading`;
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    } else if (platform === 'email') {
      shareUrl = `mailto:?subject=Check out this post on KodoTrading&body=${encodeURIComponent(shareText)}`;
    }
    window.open(shareUrl, '_blank');
    onShare(post.id);
    handleShareClose();
  };

  const renderContentWithTickers = (content: string) => {
    const tickerRegex = /\$([A-Z]{1,5})/g;
    const tagRegex = /@([A-Za-z0-9_]+)/g;
    const parts = content.split(tickerRegex);
    return parts.map((part, i) =>
      tickerRegex.test(`$${part}`) ? (
        <Link
          key={i}
          href="#"
          onClick={async (e) => {
            e.preventDefault();
            setShowChart(part);
            const newsItems = await fetchNews(part);
            setNews(newsItems);
            addToWatchlist(part);
          }}
          sx={{ color: 'primary.main', cursor: 'pointer' }}
        >
          ${part}
        </Link>
      ) : (
        part.split(tagRegex).map((subPart, j) =>
          tagRegex.test(`@${subPart}`) ? (
            <Link key={`${i}-${j}`} href={`/profile/${subPart}`} sx={{ color: 'primary.main', cursor: 'pointer' }}>
              @{subPart}
            </Link>
          ) : (
            subPart
          )
        )
      )
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
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
          {post.user === username && <IconButton onClick={() => onDelete(post.id)}><Delete fontSize="small" /></IconButton>}
        </Box>
        {post.content && <Typography variant="body1">{renderContentWithTickers(post.content)}</Typography>}
        {post.sentiment && (
          <Typography component="span" sx={{ color: post.sentiment === 'bullish' ? '#2E7D32' : '#D32F2F', fontWeight: 600, fontSize: '0.9rem' }}>
            [{post.sentiment}]
          </Typography>
        )}
        {post.tradeSettings && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Trade Settings: Stop Loss: {post.tradeSettings.stopLoss}%, Take Profit: {post.tradeSettings.takeProfit}%, Trailing Stop: {post.tradeSettings.trailingStop ? 'Yes' : 'No'}
            </Typography>
          </Box>
        )}
        {post.media && (
          post.media.type === 'photo' ? <img src={post.media.url} alt="Post media" style={{ maxWidth: '100%', borderRadius: 8, mt: 1 }} /> :
          <video src={post.media.url} controls style={{ maxWidth: '100%', borderRadius: 8, mt: 1 }} />
        )}
        {post.nft && (
          <Box sx={{ mt: 2, display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
            <Box sx={{ minWidth: 150, flexShrink: 0 }}>
              <img src={post.nft.image} alt={post.nft.name} style={{ width: '100%', borderRadius: 8 }} />
              <Typography variant="body2" sx={{ mt: 1 }}>{post.nft.name}</Typography>
            </Box>
            {post.nft.details.map((detail, i) => (
              <Box key={i} sx={{ minWidth: 150, flexShrink: 0, bgcolor: 'rgba(255, 255, 255, 0.05)', p: 1, borderRadius: 2 }}>
                <Typography variant="body2">{detail.trait}: {detail.value}</Typography>
              </Box>
            ))}
          </Box>
        )}
        {post.priceUpdate && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              {post.priceUpdate.type === 'crypto' ? '' : '$'}{post.priceUpdate.symbol}: ${post.priceUpdate.price.toFixed(2)}
              <Typography component="span" sx={{ ml: 1, color: post.priceUpdate.change >= 0 ? '#2E7D32' : '#D32F2F' }}>
                {post.priceUpdate.change.toFixed(2)}%
              </Typography>
            </Typography>
            <Box sx={{ mt: 1 }}>
              <FormControl sx={{ width: 120, mb: 1 }}>
                <InputLabel>Chart Type</InputLabel>
                <Select value="Candlestick" size="small">
                  <MenuItem value="Candlestick">Candlestick</MenuItem>
                  <MenuItem value="Heikin-Ashi">Heikin-Ashi</MenuItem>
                  <MenuItem value="Renko">Renko</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ height: 100, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Chart for {post.priceUpdate.type === 'crypto' ? '' : '$'}{post.priceUpdate.symbol} (Mock)
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        {showChart && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">Chart for ${showChart} (Disabled due to error)</Typography>
            <Button onClick={() => setShowChart(null)} sx={{ mt: 1 }}>Hide Chart</Button>
          </Box>
        )}
        {news.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">News for ${showChart}</Typography>
            {news.map((item, i) => (
              <Typography key={i} variant="body2">
                <Link href={item.url} target="_blank">{item.title}</Link> - {item.source}
              </Typography>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1, mt: 1, color: 'text.secondary' }}>
          <IconButton onClick={() => onLike(post.id)}><ThumbUp fontSize="small" /> {post.likes}</IconButton>
          <IconButton><Comment fontSize="small" /> {post.comments.length}</IconButton>
          <IconButton onClick={handleShare}><Share fontSize="small" /> {post.shares}</IconButton>
          <IconButton><EmojiEmotions fontSize="small" /></IconButton>
        </Box>
        <Menu anchorEl={shareAnchorEl} open={Boolean(shareAnchorEl)} onClose={handleShareClose}>
          <MenuItem onClick={() => handleShareAction('twitter')}>Share to Twitter</MenuItem>
          <MenuItem onClick={() => handleShareAction('email')}>Share via Email</MenuItem>
        </Menu>
        {post.comments.map((comment, cIndex) => (
          <Typography key={cIndex} variant="body2" sx={{ mt: 1, ml: 2, color: 'text.secondary' }}>
            {renderContentWithTickers(comment)}
          </Typography>
        ))}
        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Add a comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (onCommentSubmit(post.id, commentInput), setCommentInput(''))}
            sx={{ flexGrow: 1 }}
          />
          <Button size="small" onClick={() => (onCommentSubmit(post.id, commentInput), setCommentInput(''))}>Comment</Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default PostCard;
