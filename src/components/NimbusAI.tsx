import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, Switch } from '@mui/material';

const NimbusAI: React.FC = () => {
  const [tradingStyle, setTradingStyle] = useState('penny');
  const [targetProfit, setTargetProfit] = useState(10);
  const [autoTrade, setAutoTrade] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [executedTrades, setExecutedTrades] = useState<string[]>([]);

  const generateRecommendation = () => {
    const rec = tradingStyle === 'penny'
      ? 'Buy $PENY at $0.50 with a 2% stop-loss and 10% target (Sykes’ strategy).'
      : 'Swing trade $AAPL with a 5% stop-loss and 15% target (Cameron’s momentum).';
    setRecommendation(rec);

    if (autoTrade) {
      setExecutedTrades((prev) => [...prev, `Auto-executed: ${rec} at ${new Date().toLocaleTimeString()}`]);
    }

    const audio = new Audio('/src/assets/alert.wav');
    audio.play().catch((err) => console.log('Audio play failed:', err));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoTrade) {
      interval = setInterval(() => {
        generateRecommendation();
      }, 30000); // Auto-trade every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoTrade, tradingStyle, targetProfit]);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Nimbus.AI Supreme</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl sx={{ width: 150 }}>
          <InputLabel>Trading Style</InputLabel>
          <Select
            value={tradingStyle}
            onChange={(e) => setTradingStyle(e.target.value)}
            size="small"
          >
            <MenuItem value="penny">Penny Stocks</MenuItem>
            <MenuItem value="swing">Swing</MenuItem>
            <MenuItem value="day">Day Trading</MenuItem>
            <MenuItem value="scalp">Scalping</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <InputLabel>Target Profit (%)</InputLabel>
          <Select
            value={targetProfit}
            onChange={(e) => setTargetProfit(Number(e.target.value))}
            size="small"
          >
            <MenuItem value={5}>5%</MenuItem>
            <MenuItem value={10}>10%</MenuItem>
            <MenuItem value={15}>15%</MenuItem>
            <MenuItem value={20}>20%</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Auto-Trade</Typography>
          <Switch checked={autoTrade} onChange={(e) => setAutoTrade(e.target.checked)} />
        </Box>
        <Button variant="contained" color="primary" onClick={generateRecommendation} disabled={autoTrade}>
          Generate Recommendation
        </Button>
      </Box>
      {recommendation && (
        <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, mb: 2 }}>
          <Typography variant="body1">{recommendation}</Typography>
        </Box>
      )}
      {executedTrades.length > 0 && (
        <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>Auto-Executed Trades</Typography>
          {executedTrades.map((trade, i) => (
            <Typography key={i} variant="body2">{trade}</Typography>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default NimbusAI;