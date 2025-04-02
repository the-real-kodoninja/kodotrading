import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { fetchPosts } from '../../api/mockApi';

interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchPosts(0, 100).then((posts) => {
      const mockActivities: Activity[] = posts.flatMap((post) => [
        { user: post.user, action: 'posted', target: post.content, time: post.time },
        ...post.comments.map((comment, i) => ({
          user: 'Unknown',
          action: 'commented on',
          target: `${post.user}'s post: ${comment}`,
          time: `${i + 1}m ago`,
        })),
      ]);
      setActivities(mockActivities);
    });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h6">User Activity Feed</Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
        {activities.map((activity, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`${activity.user} ${activity.action} ${activity.target}`}
              secondary={activity.time}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ActivityFeed;
