import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface Option {
  strike: number;
  callPrice: number;
  callVolume: number;
  putPrice: number;
  putVolume: number;
}

interface OptionsChainProps {
  ticker: string;
}

const OptionsChain: React.FC<OptionsChainProps> = ({ ticker }) => {
  const options: Option[] = [
    { strike: 145, callPrice: 5.20, callVolume: 1200, putPrice: 2.10, putVolume: 800 },
    { strike: 150, callPrice: 3.50, callVolume: 1500, putPrice: 3.80, putVolume: 900 },
    { strike: 155, callPrice: 2.10, callVolume: 1000, putPrice: 5.50, putVolume: 1100 },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Options Chain for {ticker}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Strike</TableCell>
            <TableCell>Call Price</TableCell>
            <TableCell>Call Volume</TableCell>
            <TableCell>Put Price</TableCell>
            <TableCell>Put Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((option, index) => (
            <TableRow key={index}>
              <TableCell>${option.strike.toFixed(2)}</TableCell>
              <TableCell>${option.callPrice.toFixed(2)}</TableCell>
              <TableCell>{option.callVolume.toLocaleString()}</TableCell>
              <TableCell>${option.putPrice.toFixed(2)}</TableCell>
              <TableCell>{option.putVolume.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OptionsChain;
