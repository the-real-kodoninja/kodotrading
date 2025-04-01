import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';

interface Message {
  user: string;
  text: string;
  timestamp: string;
  group?: string;
}

const LiveChat: React.FC<{ username: string | null }> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [group, setGroup] = useState('General');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const groups = ['General', 'Traders Lounge', 'Crypto Crew', 'Stock Gurus'];

  useEffect(() => {
    const mockMessages: Message[] = [
      { user: 'TraderX', text: 'Hey everyone, $AAPL is looking bullish!', timestamp: '10:00', group: 'General' },
      { user: 'StockGuru', text: 'I’m in on $TSLA, let’s see how it goes.', timestamp: '10:01', group: 'General' },
    ];
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !username) return;
    const message: Message = {
      user: username,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      group,
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Live Chat
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          fullWidth
          size="small"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}
        >
          {groups.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, maxHeight: 400, overflowY: 'auto' }}>
        <List>
          {messages
            .filter((msg) => msg.group === group)
            .map((msg, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`${msg.user}: ${msg.text}`}
                  secondary={msg.timestamp}
                  primaryTypographyProps={{ color: msg.user === username ? 'primary.main' : 'inherit' }}
                />
              </ListItem>
            ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default LiveChat;