import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';

interface PostFormProps {
  username: string | null;
  onPostSubmit: (post: any) => void;
  setRuleWarnings: React.Dispatch<React.SetStateAction<string[]>>;
}

const PostForm: React.FC<PostFormProps> = ({ username, onPostSubmit, setRuleWarnings }) => {
  const [content, setContent] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [trailingStop, setTrailingStop] = useState(false);

  const handleSubmit = () => {
    if (!username) {
      alert('Please log in to post.');
      return;
    }
    if (!content.trim()) return;

    const warnings: string[] = [];
    if (content.toLowerCase().includes('guarantee')) {
      warnings.push('Avoid using "guarantee" in posts.');
    }
    if (content.length > 280) {
      warnings.push('Post exceeds 280 characters.');
    }
    setRuleWarnings(warnings);

    if (warnings.length > 0) return;

    const post: any = {
      id: Date.now(),
      user: username,
      time: 'Just now',
      content,
      likes: 0,
      comments: [],
      shares: 0,
    };

    if (sentiment) {
      post.sentiment = sentiment;
    }
    if (mediaType && mediaUrl) {
      post.media = { type: mediaType, url: mediaUrl };
    }
    if (stopLoss || takeProfit) {
      post.tradeSettings = {
        stopLoss: stopLoss ? Number(stopLoss) : 0,
        takeProfit: takeProfit ? Number(takeProfit) : 0,
        trailingStop,
      };
    }

    onPostSubmit(post);
    setContent('');
    setSentiment('');
    setMediaType('');
    setMediaUrl('');
    setStopLoss('');
    setTakeProfit('');
    setTrailingStop(false);
  };

  return (
    <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, mb: 2 }}>
      <TextField
        fullWidth
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
        <Select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          displayEmpty
          size="small"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}
        >
          <MenuItem value="">Sentiment</MenuItem>
          <MenuItem value="bullish">Bullish</MenuItem>
          <MenuItem value="bearish">Bearish</MenuItem>
        </Select>
        <Select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          displayEmpty
          size="small"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}
        >
          <MenuItem value="">Media Type</MenuItem>
          <MenuItem value="photo">Photo</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </Select>
        {mediaType && (
          <TextField
            label="Media URL"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            variant="outlined"
            size="small"
          />
        )}
        <TextField
          label="Stop Loss ($)"
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Take Profit ($)"
          type="number"
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
          variant="outlined"
          size="small"
        />
        <FormControlLabel
          control={<Switch checked={trailingStop} onChange={(e) => setTrailingStop(e.target.checked)} />}
          label="Trailing Stop"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Post
      </Button>
    </Box>
  );
};

export default PostForm;