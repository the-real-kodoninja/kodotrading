import React, { useState } from 'react';
import { Container, Typography, Box, FormControlLabel, Switch, Button } from '@mui/material';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Settings
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <FormControlLabel
          control={<Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />}
          label="Enable Notifications"
        />
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
          label="Dark Mode"
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Settings
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
