import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Card, CardContent, CardMedia } from '@mui/material';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'tutorial';
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
}

const EducationHub: React.FC = () => {
  const [tab, setTab] = useState(0);
  const resources: Resource[] = [
    {
      id: 1,
      title: 'Introduction to Stock Trading',
      description: 'Learn the basics of stock trading, including key terms and strategies.',
      type: 'article',
      category: 'Beginner',
    },
    {
      id: 2,
      title: 'How to Read Candlestick Charts',
      description: 'A video guide on understanding candlestick patterns.',
      type: 'video',
      category: 'Intermediate',
      image: 'https://via.placeholder.com/300x150?text=Candlestick+Charts',
    },
    {
      id: 3,
      title: 'Advanced Options Strategies',
      description: 'A step-by-step tutorial on advanced options trading techniques.',
      type: 'tutorial',
      category: 'Advanced',
    },
  ];

  const filteredResources = resources.filter((resource) => {
    if (tab === 0) return true;
    if (tab === 1) return resource.category === 'Beginner';
    if (tab === 2) return resource.category === 'Intermediate';
    if (tab === 3) return resource.category === 'Advanced';
    return false;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2 }}>
        Education Hub
      </Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="Beginner" />
        <Tab label="Intermediate" />
        <Tab label="Advanced" />
      </Tabs>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredResources.map((resource) => (
          <Card key={resource.id} sx={{ display: 'flex', bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
            {resource.image && (
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={resource.image}
                alt={resource.title}
              />
            )}
            <CardContent>
              <Typography variant="body1">{resource.title}</Typography>
              <Typography variant="body2" color="text.secondary">{resource.description}</Typography>
              <Typography variant="caption" color="text.secondary">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default EducationHub;
