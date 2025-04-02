import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import { containerStyle, typographyHeaderStyle, inputStyle, buttonStyle } from '../../assets/styles/styles';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
}

interface LiveChatProps {
  username: string | null;
}

const LiveChat: React.FC<LiveChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, { ...message, timestamp: new Date(message.timestamp) }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!username || !newMessage.trim() || !socket) return;

    const message: Message = {
      id: Date.now().toString(),
      username,
      content: newMessage,
      timestamp: new Date(),
    };

    socket.emit('message', message);
    setNewMessage('');
  };

  if (!username) {
    return (
      <Container sx={containerStyle}>
        <Typography variant="h5" sx={typographyHeaderStyle}>
          Live Chat
        </Typography>
        <Typography>Please log in to join the chat.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle} id="live-chat-title">
        Live Chat
      </Typography>
      <Box
        sx={{ height: 400, overflowY: 'auto', mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">
                    {message.username} • {message.timestamp.toLocaleTimeString()}
                  </Typography>
                }
                secondary={message.content}
              />
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
          sx={inputStyle}
          aria-label="Type a chat message"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={buttonStyle}
          disabled={!newMessage.trim()}
          aria-label="Send chat message"
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default LiveChat;