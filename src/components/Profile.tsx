import React from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';

const Profile: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Trades: 150</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Followers: 320</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Bio: Passionate trader.</Typography>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);

export default Profile;
