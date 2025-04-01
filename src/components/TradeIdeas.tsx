import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

interface TradeIdea {
  id: number;
  ticker: string;
  direction: 'buy' | 'sell';
  reason: string;
  confidence: number;
  timestamp: string;
}

const TradeIdeas: React.FC = () => {
  const [tradeIdeas, setTradeIdeas] = useState<TradeIdea[]>([]);

  useEffect(() => {
    const mockTradeIdeas: TradeIdea[] = [
      {
        id: 1,
        ticker: 'AAPL',
        direction: 'buy',
        reason: 'Breaking out above 50-day moving average with high volume.',
        confidence: 0.85,
        timestamp: '10m ago',
      },
      {
        id: 2,
        ticker: 'TSLA',
        direction: 'sell',
        reason: 'Overbought RSI and bearish divergence.',
        confidence: 0.72,
        timestamp: '15m ago',
      },
    ];
    setTradeIdeas(mockTradeIdeas);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Trade Ideas
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tradeIdeas.map((idea) => (
          <Card key={idea.id} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Link to={`/stock/${idea.ticker}`}>
                  <Typography variant="body1">{idea.ticker}</Typography>
                </Link>
                <Chip
                  label={idea.direction.toUpperCase()}
                  color={idea.direction === 'buy' ? 'success' : 'error'}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">{idea.reason}</Typography>
              <Typography variant="caption" color="text.secondary">
                Confidence: {(idea.confidence * 100).toFixed(0)}% • {idea.timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TradeIdeas;
