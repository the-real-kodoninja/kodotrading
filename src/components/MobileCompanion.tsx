import React, { useState } from 'react';
import { Box, Typography, Switch } from '@mui/material';

interface MobileCompanionProps {
  onToggle: (isMobile: boolean) => void;
}

const MobileCompanion: React.FC<MobileCompanionProps> = ({ onToggle }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMobileView(event.target.checked);
    onToggle(event.target.checked);
  };

  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
      <Typography>Mobile Companion View</Typography>
      <Switch checked={isMobileView} onChange={handleToggle} />
    </Box>
  );
};

export default MobileCompanion;
