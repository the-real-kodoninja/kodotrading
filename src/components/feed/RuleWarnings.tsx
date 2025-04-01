import React from 'react';
import { Box, Typography } from '@mui/material';

interface RuleWarningsProps {
  warnings: string[];
}

const RuleWarnings: React.FC<RuleWarningsProps> = ({ warnings }) => {
  if (!warnings.length) return null;

  return (
    <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(255, 0, 0, 0.1)', borderRadius: 2 }}>
      {warnings.map((warning, i) => (
        <Typography key={i} variant="body2" color="error">{warning}</Typography>
      ))}
    </Box>
  );
};

export default RuleWarnings;

