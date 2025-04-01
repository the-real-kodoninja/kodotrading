import React, { useState, useRef } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { applyTradingRules } from '../../utils/tradingRules';
import { addPost } from '../../api/mockApi';

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
  tradeSettings?: { stopLoss: number; takeProfit: number; trailingStop: boolean };
}

interface PostFormProps {
  username: string | null;
  onPostSubmit: (post: Post) => void;
  setRuleWarnings: (warnings: string[]) => void;
}

const PostForm: React.FC<PostFormProps> = ({ username, onPostSubmit, setRuleWarnings }) => {
  const [newPost, setNewPost] = useState('');
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [trailingStop, setTrailingStop] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const warnings = applyTradingRules(newPost, { stopLoss, takeProfit, trailingStop });
    if (warnings.length > 0) {
      setRuleWarnings(warnings);
      return;
    }

    const sentiment = newPost.toLowerCase().includes('bull') ? 'bullish' : newPost.toLowerCase().includes('bear') ? 'bearish' : undefined;
    const media = fileInputRef.current?.files?.[0]
      ? { type: fileInputRef.current.files[0].type.startsWith('video') ? 'video' : 'photo', url: URL.createObjectURL(fileInputRef.current.files[0]) }
      : undefined;
    const post: Post = {
      id: Date.now(), // Temporary ID until backend
      user: username || 'Guest',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
      shares: 0,
      sentiment,
      media,
      tradeSettings: { stopLoss, takeProfit, trailingStop },
    };
    await addPost(post);
    onPostSubmit(post);

    // Play sound alert
    const audio = new Audio('/src/assets/alert.wav');
    audio.play().catch((err) => console.log('Audio play failed:', err));

    setNewPost('');
    setStopLoss(0);
    setTakeProfit(0);
    setTrailingStop(false);
    setRuleWarnings([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <TextField
        fullWidth
        placeholder="Share your trading thoughts (e.g., $AAPL bullish)"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        variant="outlined"
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <TextField
          label="Stop Loss (%)"
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
        <TextField
          label="Take Profit (%)"
          type="number"
          value={takeProfit}
          onChange={(e) => setTakeProfit(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
        <FormControl sx={{ width: 120 }}>
          <InputLabel>Trailing Stop</InputLabel>
          <Select
            value={trailingStop ? 'Yes' : 'No'}
            onChange={(e) => setTrailingStop(e.target.value === 'Yes')}
            size="small"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <input type="file" ref={fileInputRef} accept="image/*,video/*" style={{ color: '#E4E6EB' }} />
        <Button type="submit" variant="contained" color="primary">Post</Button>
      </Box>
    </form>
  );
};

export default PostForm;
