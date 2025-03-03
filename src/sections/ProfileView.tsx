'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Skeleton,
  Card,
  CardMedia,
} from '@mui/material';

interface Post {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
}

interface Profile {
  bio: string | null;
  location: string | null;
  interests: string[];
}

interface User {
  id: string;
  name: string | null;
  image: string | null;
  profile: Profile | null;
  posts: Post[];
}

// Helper function to ensure URLs have a protocol
const getFullUrl = (url: string | null) => {
  if (!url) return '/default-avatar.png'; // fallback if null
  if (url.startsWith('http')) return url;
  return `https://${url}`;
};

export default function ProfileView({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Skeleton variant="circular" width={150} height={150} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" height={40} width="50%" sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" height={20} width="70%" sx={{ mx: 'auto', mb: 3 }} />
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography color="error" align="center" sx={{ py: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md">
        <Typography align="center" sx={{ py: 4 }}>
          Profile not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Profile Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            src={getFullUrl(user.image)}
            alt={user.name || 'User'}
            sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            {user.name || 'Unnamed User'}
          </Typography>
          
          {user.profile && (
            <Box sx={{ mb: 3 }}>
              {user.profile.bio && (
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {user.profile.bio}
                </Typography>
              )}
              {user.profile.location && (
                <Typography variant="body2" color="text.secondary">
                  📍 {user.profile.location}
                </Typography>
              )}
              {user.profile.interests.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  {user.profile.interests.map((interest, index) => (
                    <Typography
                      key={index}
                      component="span"
                      sx={{
                        display: 'inline-block',
                        m: 0.5,
                        px: 1,
                        py: 0.5,
                        bgcolor: 'primary.light',
                        borderRadius: 1,
                        color: 'white',
                      }}
                    >
                      {interest}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Posts Grid */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Posts
        </Typography>
        <Grid container spacing={2}>
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 250,
                      objectFit: 'cover',
                    }}
                    image={post.imageUrl}
                    alt={post.caption || 'Post image'}
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No posts yet
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
