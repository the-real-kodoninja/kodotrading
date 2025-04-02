import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

const StockScreener: React.FC = () => {
  const [filters, setFilters] = useState({
    marketCapMin: '',
    marketCapMax: '',
    peRatioMin: '',
    peRatioMax: '',
    volumeMin: '',
    volumeMax: '',
    sector: '',
    priceMin: '',
    priceMax: '',
  });

  const [results, setResults] = useState([
    { ticker: 'AAPL', price: 150.25, change: 2.5, volume: 75000000, marketCap: 2400000000000, peRatio: 28.5, sector: 'Technology' },
    { ticker: 'TSLA', price: 700.00, change: -1.2, volume: 30000000, marketCap: 700000000000, peRatio: 90.0, sector: 'Consumer Cyclical' },
  ]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    // Mock filtering logic; replace with real API calls in the backend phase
    const filteredResults = [
      { ticker: 'AAPL', price: 150.25, change: 2.5, volume: 75000000, marketCap: 2400000000000, peRatio: 28.5, sector: 'Technology' },
      { ticker: 'TSLA', price: 700.00, change: -1.2, volume: 30000000, marketCap: 700000000000, peRatio: 90.0, sector: 'Consumer Cyclical' },
    ].filter((stock) => {
      const marketCapMin = filters.marketCapMin ? Number(filters.marketCapMin) * 1000000000 : 0;
      const marketCapMax = filters.marketCapMax ? Number(filters.marketCapMax) * 1000000000 : Infinity;
      const peRatioMin = filters.peRatioMin ? Number(filters.peRatioMin) : 0;
      const peRatioMax = filters.peRatioMax ? Number(filters.peRatioMax) : Infinity;
      const volumeMin = filters.volumeMin ? Number(filters.volumeMin) : 0;
      const volumeMax = filters.volumeMax ? Number(filters.volumeMax) : Infinity;
      const priceMin = filters.priceMin ? Number(filters.priceMin) : 0;
      const priceMax = filters.priceMax ? Number(filters.priceMax) : Infinity;

      return (
        stock.marketCap >= marketCapMin &&
        stock.marketCap <= marketCapMax &&
        stock.peRatio >= peRatioMin &&
        stock.peRatio <= peRatioMax &&
        stock.volume >= volumeMin &&
        stock.volume <= volumeMax &&
        stock.price >= priceMin &&
        stock.price <= priceMax &&
        (filters.sector ? stock.sector === filters.sector : true)
      );
    });

    setResults(filteredResults);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Stock Screener
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
          <TextField
            label="Min Market Cap ($B)"
            type="number"
            value={filters.marketCapMin}
            onChange={(e) => handleFilterChange('marketCapMin', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Max Market Cap ($B)"
            type="number"
            value={filters.marketCapMax}
            onChange={(e) => handleFilterChange('marketCapMax', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Min P/E Ratio"
            type="number"
            value={filters.peRatioMin}
            onChange={(e) => handleFilterChange('peRatioMin', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Max P/E Ratio"
            type="number"
            value={filters.peRatioMax}
            onChange={(e) => handleFilterChange('peRatioMax', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Min Volume"
            type="number"
            value={filters.volumeMin}
            onChange={(e) => handleFilterChange('volumeMin', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Max Volume"
            type="number"
            value={filters.volumeMax}
            onChange={(e) => handleFilterChange('volumeMax', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Min Price ($)"
            type="number"
            value={filters.priceMin}
            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Max Price ($)"
            type="number"
            value={filters.priceMax}
            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            variant="outlined"
            size="small"
          />
          <Select
            value={filters.sector}
            onChange={(e) => handleFilterChange('sector', e.target.value)}
            displayEmpty
            size="small"
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}
          >
            <MenuItem value="">All Sectors</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Consumer Cyclical">Consumer Cyclical</MenuItem>
            <MenuItem value="Financial Services">Financial Services</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Change</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>P/E Ratio</TableCell>
            <TableCell>Sector</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell>
                <Link to={`/stock/${stock.ticker}`}>{stock.ticker}</Link>
              </TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
              <TableCell sx={{ color: stock.change >= 0 ? 'success.main' : 'error.main' }}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </TableCell>
              <TableCell>{stock.volume.toLocaleString()}</TableCell>
              <TableCell>${(stock.marketCap / 1000000000).toFixed(2)}B</TableCell>
              <TableCell>{stock.peRatio.toFixed(2)}</TableCell>
              <TableCell>{stock.sector}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default StockScreener;