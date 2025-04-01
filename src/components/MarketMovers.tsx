import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

interface MarketMover {
  ticker: string;
  price: number;
  changePercent: number;
  volume: number;
}

const MarketMovers: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [gainers, setGainers] = useState<MarketMover[]>([]);
  const [losers, setLosers] = useState<MarketMover[]>([]);
  const [active, setActive] = useState<MarketMover[]>([]);

  useEffect(() => {
    const mockGainers: MarketMover[] = [
      { ticker: 'AAPL', price: 150.25, changePercent: 5.2, volume: 75000000 },
      { ticker: 'MSFT', price: 300.50, changePercent: 4.8, volume: 40000000 },
    ];
    const mockLosers: MarketMover[] = [
      { ticker: 'TSLA', price: 700.00, changePercent: -3.5, volume: 30000000 },
      { ticker: 'NVDA', price: 220.75, changePercent: -2.8, volume: 25000000 },
    ];
    const mockActive: MarketMover[] = [
      { ticker: 'AMD', price: 110.30, changePercent: 1.2, volume: 90000000 },
      { ticker: 'F', price: 15.75, changePercent: -0.5, volume: 85000000 },
    ];
    setGainers(mockGainers);
    setLosers(mockLosers);
    setActive(mockActive);
  }, []);

  const data = tab === 0 ? gainers : tab === 1 ? losers : active;

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Market Movers
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Top Gainers" />
        <Tab label="Top Losers" />
        <Tab label="Most Active" />
      </Tabs>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change %</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/stock/${stock.ticker}`}>{stock.ticker}</Link>
                </TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell sx={{ color: stock.changePercent >= 0 ? 'success.main' : 'error.main' }}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </TableCell>
                <TableCell>{stock.volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default MarketMovers;
