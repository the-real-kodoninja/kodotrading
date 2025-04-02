import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate notifications for group chat messages and live video events
    const mockNotifications: Notification[] = [
      { id: 1, message: 'New message in Traders Lounge: "Check out $AAPL!"', timestamp: '2m ago' },
      { id: 2, message: 'Live video started: $BTC Analysis by StockGuru', timestamp: '5m ago' },
    ];
    setNotifications(mockNotifications);

    // Simulate new notifications every 30 seconds
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: notifications.length + 1,
        message: `New message in Crypto Crew: "What’s your take on $ETH?"`,
        timestamp: 'Just now',
      };
      setNotifications((prev) => [...prev, newNotification]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Notifications
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, maxHeight: 400, overflowY: 'auto' }}>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} secondary={notification.timestamp} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Notifications;