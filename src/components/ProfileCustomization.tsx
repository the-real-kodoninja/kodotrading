import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, FormControlLabel, Switch, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileCustomization: React.FC = () => {
  const [bio, setBio] = useState('Swing trader since 2015.');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [showTrades, setShowTrades] = useState(true);
  const [showFollowers, setShowFollowers] = useState(true);
  const navigate = useNavigate();

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log('Saving profile:', { bio, profilePicture, showTrades, showFollowers });
    navigate('/profile');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Customize Your Profile
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar src={profilePicture} sx={{ width: 100, height: 100, mb: 2 }} />
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Button>
        </Box>
        <TextField
          fullWidth
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          variant="outlined"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Switch checked={showTrades} onChange={(e) => setShowTrades(e.target.checked)} />}
          label="Show Number of Trades"
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          control={<Switch checked={showFollowers} onChange={(e) => setShowFollowers(e.target.checked)} />}
          label="Show Number of Followers"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileCustomization;
