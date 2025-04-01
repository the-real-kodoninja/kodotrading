import React, { useState } from 'react';
import { Grid, Paper, Typography, Container, Button, TextField } from '@mui/material';

interface ProfileProps {
  trades?: number;
  followers?: number;
  bio?: string;
}

const Profile: React.FC<ProfileProps> = ({ trades: initialTrades = 150, followers: initialFollowers = 320, bio: initialBio = 'Passionate trader.' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [trades, setTrades] = useState(initialTrades);
  const [followers, setFollowers] = useState(initialFollowers);
  const [bio, setBio] = useState(initialBio);

  const handleSave = () => {
    setIsEditing(false);
    // Later: Save to backend
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {isEditing ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Trades"
                type="number"
                value={trades}
                onChange={(e) => setTrades(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Followers"
                type="number"
                value={followers}
                onChange={(e) => setFollowers(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} sx={{ ml: 1 }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : (
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
            <Grid item xs={12}>
              <Button onClick={() => setIsEditing(true)} variant="outlined">
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;