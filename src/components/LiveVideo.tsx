import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, TextField, Button, Select, MenuItem } from '@mui/material';

interface Message {
  user: string;
  text: string;
  timestamp: string;
  gift?: { type: string; value: number };
}

const LiveVideo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [gift, setGift] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const gifts = [
    { type: 'Star', value: 10 },
    { type: 'Rocket', value: 50 },
    { type: 'Diamond', value: 100 },
  ];

  useEffect(() => {
    const mockMessages: Message[] = [
      { user: 'TraderX', text: 'Great stream!', timestamp: '10:00' },
      { user: 'StockGuru', text: '', timestamp: '10:01', gift: { type: 'Star', value: 10 } },
    ];
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !gift) return;
    const message: Message = {
      user: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      gift: gift ? gifts.find((g) => g.type === gift) : undefined,
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    setGift('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Live Video Stream
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Live Video Placeholder (e.g., $AAPL Analysis)
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, maxHeight: 300, overflowY: 'auto' }}>
            <List>
              {messages.map((msg, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={
                      msg.gift
                        ? `${msg.user} sent a ${msg.gift.type} (${msg.gift.value} tokens)`
                        : `${msg.user}: ${msg.text}`
                    }
                    secondary={msg.timestamp}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              variant="outlined"
              size="small"
            />
            <Select
              value={gift}
              onChange={(e) => setGift(e.target.value)}
              fullWidth
              size="small"
              displayEmpty
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}
            >
              <MenuItem value="">Send a Gift</MenuItem>
              {gifts.map((g) => (
                <MenuItem key={g.type} value={g.type}>
                  {g.type} ({g.value} tokens)
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LiveVideo;