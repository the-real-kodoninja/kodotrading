import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { getPortfolio, addHolding } from '../../services/api';
import { containerStyle, typographyHeaderStyle, cardStyle, inputStyle, buttonStyle } from '../../assets/styles/styles';

interface Holding {
  id: string;
  ticker: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
}

interface AddHoldingFormData {
  ticker: string;
  shares: string;
  purchasePrice: string;
}

const PortfolioTracker: React.FC = () => {
  const { isAuthenticated, username } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddHoldingFormData>();

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return;
      try {
        setLoading(true);
        const portfolio = await getPortfolio(username);
        setHoldings(portfolio);
      } catch (err) {
        setError('Failed to load portfolio. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  const onSubmit = async (data: AddHoldingFormData) => {
    if (!username) return;

    try {
      const newHolding = await addHolding(
        username,
        data.ticker.toUpperCase(),
        parseInt(data.shares),
        parseFloat(data.purchasePrice)
      );
      setHoldings((prev) => [...prev, newHolding]);
      reset();
    } catch (err) {
      setError('Failed to add holding. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container sx={containerStyle}>
        <Typography variant="h5" sx={typographyHeaderStyle}>
          Portfolio Tracker
        </Typography>
        <Typography>Please log in to view your portfolio.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        Portfolio Tracker
      </Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Ticker"
          {...register('ticker', {
            required: 'Ticker is required',
            pattern: {
              value: /^[A-Z]{1,5}$/,
              message: 'Ticker must be 1-5 uppercase letters',
            },
          })}
          error={!!errors.ticker}
          helperText={errors.ticker?.message}
          variant="outlined"
          size="small"
          sx={inputStyle}
        />
        <TextField
          label="Shares"
          type="number"
          {...register('shares', {
            required: 'Shares are required',
            min: {
              value: 1,
              message: 'Shares must be at least 1',
            },
          })}
          error={!!errors.shares}
          helperText={errors.shares?.message}
          variant="outlined"
          size="small"
          sx={inputStyle}
        />
        <TextField
          label="Purchase Price"
          type="number"
          {...register('purchasePrice', {
            required: 'Purchase price is required',
            min: {
              value: 0.01,
              message: 'Purchase price must be greater than 0',
            },
          })}
          error={!!errors.purchasePrice}
          helperText={errors.purchasePrice?.message}
          variant="outlined"
          size="small"
          sx={inputStyle}
        />
        <Button type="submit" variant="contained" sx={buttonStyle}>
          Add Holding
        </Button>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : holdings.length === 0 ? (
        <Typography>No holdings in your portfolio.</Typography>
      ) : (
        <Box sx={cardStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Shares</TableCell>
                <TableCell>Purchase Price</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>Total Value</TableCell>
                <TableCell>Profit/Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell>{holding.ticker}</TableCell>
                  <TableCell>{holding.shares}</TableCell>
                  <TableCell>${holding.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell>${holding.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>${(holding.shares * holding.currentPrice).toFixed(2)}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        holding.currentPrice - holding.purchasePrice >= 0
                          ? 'success.main'
                          : 'error.main',
                    }}
                  >
                    {holding.currentPrice - holding.purchasePrice >= 0 ? '+' : ''}
                    {((holding.currentPrice - holding.purchasePrice) * holding.shares).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default PortfolioTracker;