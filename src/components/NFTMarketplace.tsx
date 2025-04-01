import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

interface NFT {
  id: number;
  name: string;
  image: string;
  price: string;
  owner: string;
}

const NFTMarketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const mockNfts: NFT[] = [
      { id: 1, name: 'CryptoPunk #123', image: 'https://via.placeholder.com/150', price: '10 ETH', owner: '0x1234...5678' },
      { id: 2, name: 'Bored Ape #456', image: 'https://via.placeholder.com/150', price: '15 ETH', owner: '0x5678...1234' },
    ];
    setNfts(mockNfts);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">NFT Marketplace</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {nfts.map((nft) => (
          <Grid item xs={6} key={nft.id}>
            <Card sx={{ bgcolor: '#3A3B3C' }}>
              <CardMedia component="img" height="140" image={nft.image} alt={nft.name} />
              <CardContent>
                <Typography variant="body2">{nft.name}</Typography>
                <Typography variant="body2" color="text.secondary">Price: {nft.price}</Typography>
                <Typography variant="body2" color="text.secondary">Owner: {nft.owner}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NFTMarketplace;
