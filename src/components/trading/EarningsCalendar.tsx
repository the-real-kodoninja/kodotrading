import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

interface EarningsEvent {
  ticker: string;
  date: string;
  time: string;
  expectedEps: number;
}

const EarningsCalendar: React.FC = () => {
  const [earnings, setEarnings] = useState<EarningsEvent[]>([]);

  useEffect(() => {
    const mockEarnings: EarningsEvent[] = [
      { ticker: 'AAPL', date: '2025-05-01', time: 'After Market Close', expectedEps: 1.25 },
      { ticker: 'TSLA', date: '2025-04-20', time: 'After Market Close', expectedEps: 0.85 },
      { ticker: 'MSFT', date: '2025-04-25', time: 'After Market Close', expectedEps: 2.10 },
    ];
    setEarnings(mockEarnings);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Earnings Calendar
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Expected EPS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {earnings.map((event, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/stock/${event.ticker}`}>{event.ticker}</Link>
                </TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>${event.expectedEps.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default EarningsCalendar;
