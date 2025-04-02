import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';
import { ethers } from 'ethers';
import { useWeb3 } from '../../context/Web3Context';
import { NFTMarketplaceABI } from '../../abis/NFTMarketplaceABI';
import { containerStyle, typographyHeaderStyle, cardStyle } from '../../assets/styles/styles';

interface NFT {
  id: number;
  name: string;
  image: string;
  price: string;
}

const NFTMarketplace: React.FC = () => {
  const { account, provider, error: web3Error } = useWeb3();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock contract address (replace with your deployed contract address)
  const contractAddress = '0xYourContractAddressHere'; // Replace with actual address

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!provider || !account) return;

      try {
        setLoading(true);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, NFTMarketplaceABI, signer);

        // Mock NFT data for demo purposes
        const mockNFTs: NFT[] = [
          { id: 1, name: 'NFT #1', image: 'https://via.placeholder.com/150?text=NFT+1', price: '0.1' },
          { id: 2, name: 'NFT #2', image: 'https://via.placeholder.com/150?text=NFT+2', price: '0.2' },
        ];

        // In a real app, fetch NFT prices from the contract
        setNfts(mockNFTs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load NFTs. Please try again.');
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [provider, account]);

  const handleBuyNFT = async (tokenId: number, price: string) => {
    if (!provider || !account) {
      setError('Please connect your wallet first.');
      return;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, NFTMarketplaceABI, signer);

      const tx = await contract.buyNFT(tokenId, {
        value: ethers.utils.parseEther(price),
      });
      await tx.wait();

      setNfts((prev) => prev.filter((nft) => nft.id !== tokenId));
      setLoading(false);
    } catch (err) {
      setError('Failed to buy NFT. Please try again.');
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <Container sx={containerStyle}>
        <Typography variant="h5" sx={typographyHeaderStyle}>
          NFT Marketplace
        </Typography>
        <Typography>Please connect your wallet to view the NFT Marketplace.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={containerStyle}>
      <Typography variant="h5" sx={typographyHeaderStyle}>
        NFT Marketplace
      </Typography>
      {web3Error && <Typography color="error">{web3Error}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2, mt: 2 }}>
        {nfts.map((nft) => (
          <Card key={nft.id} sx={cardStyle}>
            <CardMedia component="img" height="140" image={nft.image} alt={nft.name} />
            <CardContent>
              <Typography variant="body1">{nft.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {nft.price} ETH
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleBuyNFT(nft.id, nft.price)}
                sx={{ mt: 1 }}
                disabled={loading}
              >
                Buy NFT
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default NFTMarketplace;