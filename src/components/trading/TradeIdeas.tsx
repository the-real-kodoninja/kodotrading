import React from 'react';
import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { containerStyle, typographyHeaderStyle, cardStyle } from '../../assets/styles/styles'; // Fixed import path

const TradeIdeas = () => {
  // Mock trade ideas data
  const tradeIdeas = [
    {
      id: '1',
      ticker: 'AAPL',
      action: 'Buy',
      price: 175.50,
      target: 200.00,
      stopLoss: 165.00,
      rationale: 'Strong earnings and breakout above resistance.',
    },
    {
      id: '2',
      ticker: 'TSLA',
      action: 'Sell',
      price: 250.00,
      target: 220.00,
      stopLoss: 260.00,
      rationale: 'Overbought RSI and potential pullback.',
    },
  ];

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Trade Ideas
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tradeIdeas.map((idea) => (
          <Card key={idea.id} sx={cardStyle}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  <Link to={`/stock/${idea.ticker}`}>{idea.ticker}</Link>
                </Typography>
                <Chip label={idea.action} color={idea.action === 'Buy' ? 'success' : 'error'} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Current Price: ${idea.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target Price: ${idea.target.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stop Loss: ${idea.stopLoss.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Rationale: {idea.rationale}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TradeIdeas;