import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { buttonStyle, inputStyle } from '../../assets/styles/styles';

interface PostFormProps {
  onSubmit: (content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        sx={{ ...inputStyle, mb: 1 }}
      />
      <Button type="submit" variant="contained" sx={buttonStyle}>
        Post
      </Button>
    </Box>
  );
};

export default PostForm;