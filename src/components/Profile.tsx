import React from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';

interface ProfileProps {
  trades?: number;
  followers?: number;
  bio?: string;
}

const Profile: React.FC<ProfileProps> = ({ trades = 150, followers = 320, bio = 'Passionate trader.' }) => (
  <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Trades: {trades}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Followers: {followers}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Bio: {bio}</Typography>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);

export default Profile;