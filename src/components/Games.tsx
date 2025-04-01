import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Button, Card, CardContent, CardMedia, Select, MenuItem, TextField } from '@mui/material';

interface CandlestickPattern {
  name: string;
  description: string;
  type: 'bullish' | 'bearish' | 'reversal' | 'continuation' | 'other';
}

const candlestickPatterns: CandlestickPattern[] = [
  { name: 'Hammer', description: 'A small body with a long lower wick after a downtrend, signaling a bullish reversal.', type: 'bullish' },
  { name: 'Bullish Engulfing', description: 'A small bearish candle followed by a larger bullish candle that engulfs it.', type: 'bullish' },
  { name: 'Morning Star', description: 'A three-candle pattern with a bearish, small-bodied, and bullish candle, signaling a reversal.', type: 'bullish' },
  { name: 'Piercing Line', description: 'A bearish candle followed by a bullish candle that closes above the midpoint of the bearish candle.', type: 'bullish' },
  { name: 'Bullish Harami', description: 'A large bearish candle followed by a smaller bullish candle within its body.', type: 'bullish' },
  { name: 'Three White Soldiers', description: 'Three consecutive bullish candles with higher closes.', type: 'bullish' },
  { name: 'Hanging Man', description: 'A small body with a long lower wick after an uptrend, signaling a bearish reversal.', type: 'bearish' },
  { name: 'Bearish Engulfing', description: 'A small bullish candle followed by a larger bearish candle that engulfs it.', type: 'bearish' },
  { name: 'Evening Star', description: 'A three-candle pattern with a bullish, small-bodied, and bearish candle, signaling a reversal.', type: 'bearish' },
  { name: 'Dark Pool Cover', description: 'A bullish candle followed by a bearish candle that closes below the midpoint of the bullish candle.', type: 'bearish' },
  { name: 'Bearish Harami', description: 'A large bullish candle followed by a smaller bearish candle within its body.', type: 'bearish' },
  { name: 'Three Black Crows', description: 'Three consecutive bearish candles with lower closes.', type: 'bearish' },
  { name: 'Doji', description: 'A candle where the open and close are very close, indicating indecision.', type: 'reversal' },
  { name: 'Shooting Star', description: 'A small body with a long upper wick after an uptrend, signaling a reversal.', type: 'reversal' },
  { name: 'Inverted Hammer', description: 'A small body with a long upper wick after a downtrend, signaling a bullish reversal.', type: 'reversal' },
  { name: 'Tweezer Top', description: 'Two candles with the same high, first bullish then bearish, signaling a reversal.', type: 'reversal' },
  { name: 'Tweezer Bottom', description: 'Two candles with the same low, first bearish then bullish, signaling a reversal.', type: 'reversal' },
  { name: 'Rising Three Methods', description: 'A long bullish candle, three small bearish candles, then another long bullish candle in an uptrend.', type: 'continuation' },
  { name: 'Falling Three Methods', description: 'A long bearish candle, three small bullish candles, then another long bearish candle in a downtrend.', type: 'continuation' },
  { name: 'Mat Hold', description: 'Similar to Rising Three Methods, indicating a strong continuation.', type: 'continuation' },
  { name: 'Separating Lines', description: 'A bullish candle in an uptrend followed by a bearish candle that opens at the same level but continues the trend.', type: 'continuation' },
  { name: 'Spinning Top', description: 'A small body with long upper and lower wicks, indicating indecision.', type: 'other' },
  { name: 'Marubozu', description: 'A long body with little to no wicks, indicating strong momentum.', type: 'other' },
  { name: 'Kicker', description: 'A two-candle pattern with a gap, signaling a sudden shift in sentiment.', type: 'other' },
];

const Games: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [actualPrice, setActualPrice] = useState<number | null>(null);
  const [candlestickPattern, setCandlestickPattern] = useState<CandlestickPattern | null>(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Stock Market Prediction Game
  const handlePredict = () => {
    if (prediction === null) return;
    const mockActualPrice = Math.random() * 100 + 50; // Mock price between 50 and 150
    setActualPrice(mockActualPrice);
    const difference = Math.abs(prediction - mockActualPrice);
    const points = difference < 5 ? 10 : difference < 10 ? 5 : 0;
    setScore((prev) => prev + points);
    setFeedback(
      `Actual price: $${mockActualPrice.toFixed(2)}. Difference: $${difference.toFixed(2)}. You earned ${points} points!`
    );
  };

  // Candlestick Pattern Guessing Game
  const startNewPattern = () => {
    const randomPattern = candlestickPatterns[Math.floor(Math.random() * candlestickPatterns.length)];
    setCandlestickPattern(randomPattern);
    setGuess('');
    setFeedback(null);
  };

  const handleGuess = () => {
    if (!guess || !candlestickPattern) return;
    if (guess === candlestickPattern.name) {
      setScore((prev) => prev + 10);
      setFeedback('Correct! +10 points');
    } else {
      setFeedback(`Incorrect. The pattern was ${candlestickPattern.name}.`);
    }
  };

  useEffect(() => {
    startNewPattern(); // Start with a random pattern
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        KodoTrading Games
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Score: {score}
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Stock Market Prediction" />
        <Tab label="Guess the Candlestick Pattern" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Predict the price of $AAPL in the next 5 minutes!
          </Typography>
          <TextField
            type="number"
            label="Your Prediction ($)"
            value={prediction || ''}
            onChange={(e) => setPrediction(Number(e.target.value))}
            variant="outlined"
            size="small"
            sx={{ mb: 2, mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handlePredict}>
            Submit Prediction
          </Button>
          {feedback && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {feedback}
            </Typography>
          )}
        </Box>
      )}

      {tab === 1 && candlestickPattern && (
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Guess the candlestick pattern shown below:
          </Typography>
          <Card sx={{ maxWidth: 300, mb: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140?text=Candlestick+Pattern"
              alt="Candlestick Pattern"
            />
            <CardContent>
              <Typography variant="body2">{candlestickPattern.description}</Typography>
            </CardContent>
          </Card>
          <Select
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select a pattern</MenuItem>
            {candlestickPatterns.map((pattern) => (
              <MenuItem key={pattern.name} value={pattern.name}>
                {pattern.name}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleGuess}>
              Submit Guess
            </Button>
            <Button variant="outlined" onClick={startNewPattern}>
              New Pattern
            </Button>
          </Box>
          {feedback && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {feedback}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Games;
