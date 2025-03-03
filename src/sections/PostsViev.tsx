'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { fetchPosts } from '@/app/action/posts';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardHeader,
  Avatar,
} from '@mui/material';

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

// Helper function to ensure URLs have a protocol
const getFullUrl = (url: string | null) => {
  if (!url) return '/default-avatar.png'; // fallback if null
  // If the url starts with 'http', assume it's correct.
  if (url.startsWith('http')) return url;
  // Otherwise, prepend 'https://'
  return `https://${url}`;
};

export default function PostsView() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    }
    loadPosts();
  }, []);

  // Memoize rendered posts for performance
  const renderedPosts = useMemo(
    () =>
      posts.map((post) => (
        <Grid
          item
          xs={12}
          key={post.id}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            sx={{
              width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' },
              boxShadow: 3,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={getFullUrl(post.user.image)}
                  alt={post.user.name || 'Anonymous'}
                  sx={{ width: 40, height: 40 }}
                />
              }
              title={post.user.name || 'Anonymous'}
              subheader={`Posted on ${new Date(
                post.createdAt
              ).toLocaleDateString()}`}
              sx={{ bgcolor: 'background.paper', p: 1 }}
            />
            <CardMedia
              component="img"
              sx={{
                height: { xs: 200, sm: 250, md: 300, lg: 350 },
                objectFit: 'cover',
              }}
              image={post.imageUrl}
              alt="Post image"
            />
            <CardContent sx={{ p: 2 }}>
              {post.caption && (
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mb: 1, fontStyle: 'italic' }}
                >
                  {post.caption}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                {`Posted by ${post.user.name || 'Anonymous'}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )),
    [posts]
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default', // uses the theme's background setting
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Posts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {renderedPosts}
      </Grid>
    </Box>
  );
}






