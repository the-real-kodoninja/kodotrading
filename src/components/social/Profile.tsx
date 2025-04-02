import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Avatar, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../api/mockApi';

interface ProfileProps {
  trades: number;
  followers: number;
  bio: string;
}

interface Post {
  id: number;
  content: string;
  time: string;
}

interface NFT {
  name: string;
  image: string;
}

const Profile: React.FC<ProfileProps> = ({ trades, followers, bio }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [followTx, setFollowTx] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts(0, 3).then((posts) => setRecentPosts(posts));
    const mockNfts: NFT[] = [
      { name: 'CryptoPunk #123', image: 'https://via.placeholder.com/150' },
      { name: 'Bored Ape #456', image: 'https://via.placeholder.com/150' },
    ];
    setNfts(mockNfts);
  }, []);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowTx(`Unfollowed TraderX on blockchain: tx:0xdef456...`);
      setIsFollowing(false);
    } else {
      setFollowTx(`Followed TraderX on blockchain: tx:0xabc123...`);
      setIsFollowing(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      {/* Header Section */}
      <Box
        sx={{
          height: 200,
          background: 'linear-gradient(135deg, #8B0000 0%, #3A3B3C 100%)',
          borderRadius: 2,
          position: 'relative',
          mb: 4,
        }}
      >
        <Avatar
          src="https://ui-avatars.com/api/?name=TraderX&background=8B0000&color=FFFFFF"
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            bottom: -60,
            left: 20,
            border: '4px solid #242526',
          }}
        />
      </Box>

      {/* Profile Info Section */}
      <Box sx={{ ml: 20, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>TraderX</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{bio}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body2">Trades: {trades}</Typography>
          <Typography variant="body2">Followers: {followers}</Typography>
        </Box>
        <Button
          variant={isFollowing ? 'outlined' : 'contained'}
          color="primary"
          onClick={handleFollow}
          sx={{ mt: 2 }}
        >
          {isFollowing ? 'Unfollow (Web5)' : 'Follow (Web5)'}
        </Button>
        {followTx && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {followTx}
          </Typography>
        )}
      </Box>

      {/* Customize Profile Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
          User Profile
        </Typography>
        <Button component={Link} to="/profile/customize" variant="outlined">
          Customize Profile
        </Button>
      </Box>

      {/* Recent Posts and NFTs Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>Recent Posts</Typography>
          {recentPosts.length ? (
            recentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                  <CardContent>
                    <Typography variant="body2">{post.content}</Typography>
                    <Typography variant="caption" color="text.secondary">{post.time}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">No recent posts.</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>NFTs Owned</Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
            {nfts.map((nft, i) => (
              <Box key={i} sx={{ minWidth: 150, flexShrink: 0 }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={nft.image}
                  alt={nft.name}
                  sx={{ borderRadius: 2 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>{nft.name}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;