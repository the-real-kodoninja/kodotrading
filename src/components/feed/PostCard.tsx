import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Chip,
} from '@mui/material';
import { ThumbUp, Delete, Share, AddCircle } from '@mui/icons-material';

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
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    onCommentSubmit(post.id, comment);
    setComment('');
  };

  const extractTicker = (content: string) => {
    const match = content.match(/\$[A-Z]+/);
    return match ? match[0].replace('$', '') : null;
  };

  const ticker = extractTicker(post.content);

  return (
    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {post.user} • {post.time}
          </Typography>
          {username === post.user && (
            <IconButton onClick={() => onDelete(post.id)} size="small">
              <Delete />
            </IconButton>
          )}
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>
        {post.sentiment && (
          <Chip
            label={post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)}
            color={post.sentiment === 'bullish' ? 'success' : 'error'}
            size="small"
            sx={{ mb: 2 }}
          />
        )}
        {post.media && (
          <CardMedia
            component={post.media.type === 'video' ? 'video' : 'img'}
            controls={post.media.type === 'video'}
            src={post.media.url}
            sx={{ height: 200, borderRadius: 2, mb: 2 }}
          />
        )}
        {post.nft && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">{post.nft.name}</Typography>
            <CardMedia component="img" src={post.nft.image} sx={{ height: 100, width: 100, borderRadius: 2, mb: 1 }} />
            {post.nft.details.map((detail, index) => (
              <Typography key={index} variant="caption" color="text.secondary">
                {detail.trait}: {detail.value} |{' '}
              </Typography>
            ))}
          </Box>
        )}
        {post.priceUpdate && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              {post.priceUpdate.symbol} {post.priceUpdate.type === 'stock' ? 'Stock' : 'Crypto'} Price: $
              {post.priceUpdate.price.toFixed(2)} (
              <span style={{ color: post.priceUpdate.change >= 0 ? '#00FF00' : '#FF0000' }}>
                {post.priceUpdate.change >= 0 ? '+' : ''}{post.priceUpdate.change.toFixed(2)}%
              </span>
              )
            </Typography>
          </Box>
        )}
        {post.tradeSettings && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              Stop Loss: ${post.tradeSettings.stopLoss.toFixed(2)} | Take Profit: $
              {post.tradeSettings.takeProfit.toFixed(2)} | Trailing Stop: {post.tradeSettings.trailingStop ? 'Yes' : 'No'}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            startIcon={<ThumbUp />}
            onClick={() => onLike(post.id)}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 20 }}
          >
            {post.likes}
          </Button>
          <Button
            startIcon={<Share />}
            onClick={() => onShare(post.id)}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 20 }}
          >
            {post.shares}
          </Button>
          {ticker && (
            <Button
              startIcon={<AddCircle />}
              onClick={() => addToWatchlist(ticker)}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 20 }}
            >
              Watchlist
            </Button>
          )}
        </Box>
        <List sx={{ mb: 2 }}>
          {post.comments.map((c, index) => (
            <ListItem key={index} sx={{ py: 0 }}>
              <ListItemText primary={c} />
            </ListItem>
          ))}
        </List>
        {username && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              size="small"
            />
            <Button onClick={handleCommentSubmit} variant="contained" size="small">
              Post
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;