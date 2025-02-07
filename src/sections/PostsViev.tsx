'use client';

import { useEffect, useState } from 'react';
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

const PostView = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // Optionally, you could set an error state here and display a message to the user
      }
    };
    loadPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#fafafa' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Posts
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid
            item
            xs={12}
            key={post.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              sx={{
                width: {
                  xs: '90%', // 90% width on extra small screens (mobile)
                  sm: '80%', // 80% width on small screens
                  md: '50%', // 50% width on medium screens (tablets)
                  lg: '40%', // 40% width on large screens (desktop)
                },
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {/* Card header with poster's avatar and name */}
              <CardHeader
                avatar={
                  <Avatar
                    src={post.user.image || '/default-avatar.png'}
                    alt={post.user.name || 'Anonymous'}
                    sx={{ width: 40, height: 40 }}
                  />
                }
                title={post.user.name || 'Anonymous'}
                subheader={`Posted on ${new Date(post.createdAt).toLocaleDateString()}`}
                sx={{ backgroundColor: '#f5f5f5', p: 1 }}
              />

              {/* Post image */}
              <CardMedia
                component="img"
                sx={{
                  height: {
                    xs: '200px', // Height for mobile screens
                    sm: '250px', // Height for small screens
                    md: '300px', // Height for medium screens
                    lg: '350px', // Height for large screens (desktop)
                  },
                  objectFit: 'cover', // Ensures the image covers the area without stretching
                }}
                image={post.imageUrl}
                alt="Post image"
              />

              {/* Card content with caption and additional text */}
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
        ))}
      </Grid>
    </Box>
  );
};

export default PostView;
