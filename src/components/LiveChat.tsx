import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  user: string;
  text: string;
  time: string;
}

const LiveChat: React.FC<{ username: string | null }> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock WebSocket
  useEffect(() => {
    const mockMessages = [
      { user: 'TraderX', text: 'Anyone trading $AAPL today?', time: '10:30 AM' },
      { user: 'StockGuru', text: 'I’m in on $TSLA—bullish!', time: '10:32 AM' },
    ];
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const message: Message = {
      user: username || 'Guest',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Live Chat</Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto', bgcolor: 'background.paper', p: 2, borderRadius: 2, mb: 2 }}>
        <List>
          {messages.map((msg, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`${msg.user}: ${msg.text}`}
                secondary={msg.time}
                primaryTypographyProps={{ color: msg.user === username ? 'primary.main' : 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} variant="contained">Send</Button>
      </Box>
    </Container>
  );
};

export default LiveChat;
