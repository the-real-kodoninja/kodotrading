import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const PortfolioTracker: React.FC = () => {
  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    pl: 0,
    risk: 0,
    monteCarloVaR: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio((prev) => ({
        ...prev,
        pl: prev.pl + (Math.random() * 100 - 50),
        risk: Math.random() * 5,
        monteCarloVaR: Math.random() * 1000,
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Portfolio Analytics</Typography>
      <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
        <ListItem>
          <ListItemText primary={`Cash: $${portfolio.cash.toFixed(2)}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`P/L: $${portfolio.pl.toFixed(2)}`}
            secondaryTypographyProps={{ color: portfolio.pl >= 0 ? '#2E7D32' : '#D32F2F' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Risk: ${portfolio.risk.toFixed(2)}%`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Monte Carlo VaR: $${portfolio.monteCarloVaR.toFixed(2)}`} />
        </ListItem>
      </List>
    </Container>
  );
};

export default PortfolioTracker;