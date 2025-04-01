import React from 'react';
import { Container, Typography, Box, Divider, Chip, Card, CardMedia } from '@mui/material';
import OptionsChain from './OptionsChain';

interface StockDetailsProps {
  ticker: string;
}

const StockDetails: React.FC<StockDetailsProps> = ({ ticker }) => {
  const stockData = {
    ticker,
    price: 150.25,
    change: 2.5,
    changePercent: 1.69,
    volume: 75000000,
    marketCap: 2400000000000,
    peRatio: 28.5,
    dividendYield: 0.58,
    week52High: 182.94,
    week52Low: 124.17,
    avgVolume: 90000000,
    beta: 1.29,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    earningsDate: '2025-05-01',
    analystRating: 'Buy',
    targetPrice: 175.00,
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {stockData.ticker} Stock Details
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            ${stockData.price.toFixed(2)}
          </Typography>
          <Typography variant="h6" color={stockData.change >= 0 ? 'success.main' : 'error.main'}>
            {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
        <Card sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image="https://via.placeholder.com/600x200?text=Price+Chart"
            alt="Price Chart"
          />
        </Card>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Volume</Typography>
            <Typography variant="body1">{stockData.volume.toLocaleString()}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Market Cap</Typography>
            <Typography variant="body1">${(stockData.marketCap / 1000000000).toFixed(2)}B</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">P/E Ratio</Typography>
            <Typography variant="body1">{stockData.peRatio.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Dividend Yield</Typography>
            <Typography variant="body1">{stockData.dividendYield.toFixed(2)}%</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">52-Week High</Typography>
            <Typography variant="body1">${stockData.week52High.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">52-Week Low</Typography>
            <Typography variant="body1">${stockData.week52Low.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Avg. Volume</Typography>
            <Typography variant="body1">{stockData.avgVolume.toLocaleString()}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Beta</Typography>
            <Typography variant="body1">{stockData.beta.toFixed(2)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Sector</Typography>
            <Typography variant="body1">{stockData.sector}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Industry</Typography>
            <Typography variant="body1">{stockData.industry}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Earnings Date</Typography>
            <Typography variant="body1">{stockData.earningsDate}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Analyst Rating</Typography>
            <Chip label={stockData.analystRating} color={stockData.analystRating === 'Buy' ? 'success' : 'default'} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Target Price</Typography>
            <Typography variant="body1">${stockData.targetPrice.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>
      <OptionsChain ticker={stockData.ticker} />
    </Container>
  );
};

export default StockDetails;