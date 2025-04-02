import React from 'react';
import { Container, Typography, Box, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { containerStyle, typographyHeaderStyle, cardStyle } from '../../assets/styles/styles'; // Fixed import path

const MarketMovers = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for market movers
  const gainers = [
    { ticker: 'NVDA', price: 650.00, change: 5.2 },
    { ticker: 'AMD', price: 120.00, change: 4.8 },
  ];

  const losers = [
    { ticker: 'BA', price: 180.00, change: -3.5 },
    { ticker: 'F', price: 12.00, change: -2.9 },
  ];

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Market Movers
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Top Gainers" />
        <Tab label="Top Losers" />
      </Tabs>
      <Box sx={cardStyle}>
        {tabValue === 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Change (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gainers.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    <Link to={`/stock/${stock.ticker}`}>{stock.ticker}</Link>
                  </TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: 'success.main' }}>+{stock.change}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {tabValue === 1 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Change (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {losers.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    <Link to={`/stock/${stock.ticker}`}>{stock.ticker}</Link>
                  </TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: 'error.main' }}>{stock.change}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Container>
  );
};

export default MarketMovers;