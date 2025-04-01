import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const LiveVideo: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">Live Video Stream</Typography>
      <Box sx={{ mt: 2, bgcolor: 'background.paper', p: 2, borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Live video stream placeholder (e.g., WebRTC integration would go here).
        </Typography>
        {/* Mock video player */}
        <Box sx={{ height: 200, bgcolor: '#3A3B3C', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="text.secondary">Live Stream: $AAPL Discussion</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LiveVideo;
