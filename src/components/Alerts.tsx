import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface Alert {
  id: number;
  ticker: string;
  type: 'price' | 'volume';
  condition: 'above' | 'below';
  value: number;
  status: 'active' | 'triggered' | 'inactive';
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, ticker: 'AAPL', type: 'price', condition: 'above', value: 155, status: 'active' },
    { id: 2, ticker: 'TSLA', type: 'volume', condition: 'above', value: 35000000, status: 'triggered' },
  ]);
  const [newAlert, setNewAlert] = useState({
    ticker: '',
    type: 'price' as 'price' | 'volume',
    condition: 'above' as 'above' | 'below',
    value: '',
  });

  const handleAddAlert = () => {
    if (!newAlert.ticker || !newAlert.value) return;
    const alert: Alert = {
      id: alerts.length + 1,
      ticker: newAlert.ticker.toUpperCase(),
      type: newAlert.type,
      condition: newAlert.condition,
      value: Number(newAlert.value),
      status: 'active',
    };
    setAlerts((prev) => [...prev, alert]);
    setNewAlert({ ticker: '', type: 'price', condition: 'above', value: '' });
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Stock Alerts
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
          <TextField
            label="Ticker"
            value={newAlert.ticker}
            onChange={(e) => setNewAlert((prev) => ({ ...prev, ticker: e.target.value }))}
            variant="outlined"
            size="small"
          />
          <Select
            value={newAlert.type}
            onChange={(e) => setNewAlert((prev) => ({ ...prev, type: e.target.value as 'price' | 'volume' }))}
            size="small"
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="volume">Volume</MenuItem>
          </Select>
          <Select
            value={newAlert.condition}
            onChange={(e) => setNewAlert((prev) => ({ ...prev, condition: e.target.value as 'above' | 'below' }))}
            size="small"
          >
            <MenuItem value="above">Above</MenuItem>
            <MenuItem value="below">Below</MenuItem>
          </Select>
          <TextField
            label={newAlert.type === 'price' ? 'Price ($)' : 'Volume'}
            type="number"
            value={newAlert.value}
            onChange={(e) => setNewAlert((prev) => ({ ...prev, value: e.target.value }))}
            variant="outlined"
            size="small"
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddAlert}>
          Add Alert
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>{alert.ticker}</TableCell>
              <TableCell>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</TableCell>
              <TableCell>{alert.condition.charAt(0).toUpperCase() + alert.condition.slice(1)}</TableCell>
              <TableCell>{alert.type === 'price' ? `$${alert.value}` : alert.value.toLocaleString()}</TableCell>
              <TableCell>{alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDeleteAlert(alert.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Alerts;
