import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

interface Transaction {
  txId: string;
  from: string;
  to: string;
  amount: number;
  token: string;
  timestamp: string;
}

const CryptoTransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Mock transaction history
    const mockTransactions: Transaction[] = [
      {
        txId: '0xabc123...def456',
        from: '0x1234...5678',
        to: '0x5678...1234',
        amount: 1.5,
        token: 'ETH',
        timestamp: '2025-04-01 10:00:00',
      },
      {
        txId: '0xdef456...ghi789',
        from: '0x1234...5678',
        to: '0x9012...3456',
        amount: 5000,
        token: 'USDT',
        timestamp: '2025-04-01 09:30:00',
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>Crypto Transaction History</Typography>
      {transactions.length > 0 ? (
        <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
          {transactions.map((tx) => (
            <ListItem key={tx.txId}>
              <ListItemText
                primary={`Tx: ${tx.txId.slice(0, 8)}...`}
                secondary={`From: ${tx.from.slice(0, 6)}... To: ${tx.to.slice(0, 6)}... | ${tx.amount} ${tx.token} | ${tx.timestamp}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">No transactions found.</Typography>
      )}
    </Container>
  );
};

export default CryptoTransactionHistory;
