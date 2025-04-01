import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Notifications as NotificationsIcon, Close } from '@mui/icons-material';

interface Notification {
  id: number;
  message: string;
  time: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock notifications
    const mockNotifications = [
      { id: 1, message: 'TraderX liked your post on $AAPL', time: '2m ago' },
      { id: 2, message: 'StockGuru commented on your post', time: '5m ago' },
      { id: 3, message: '$TSLA dropped below your stop-loss', time: '10m ago' },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleDismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Notifications</Typography>
      {notifications.length ? (
        <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
          {notifications.map((notif) => (
            <ListItem
              key={notif.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDismiss(notif.id)}>
                  <Close />
                </IconButton>
              }
            >
              <ListItemText primary={notif.message} secondary={notif.time} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">No new notifications</Typography>
      )}
    </Container>
  );
};

export default Notifications;
