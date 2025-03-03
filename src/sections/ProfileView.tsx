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
  Button,
  IconButton,
  Stack,
  Divider,
  CardActions,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  // Mock data for followers/following
  const mockStats = {
    followers: 1234,
    following: 567,
  };

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLikeClick = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleSaveClick = (postId: string) => {
    setSavedPosts(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      return newSaved;
    });
  };

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
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
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
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
        <Typography color="error" align="center" sx={{ py: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
        <Typography align="center" sx={{ py: 4 }}>
          Profile not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, pb: 4 }}>
      <Box sx={{ py: 4 }}>
        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 4, flexWrap: 'wrap' }}>
          <Avatar
            src={getFullUrl(user.image)}
            alt={user.name || 'User'}
            sx={{ width: 150, height: 150 }}
          />
          
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h4">
                {user.name || 'Unnamed User'}
              </Typography>
              <Button
                variant={isFollowing ? "outlined" : "contained"}
                onClick={handleFollowClick}
                sx={{ ml: 2 }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </Box>

            <Stack
              direction="row"
              spacing={4}
              sx={{ mb: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box>
                <Typography variant="h6">{user.posts.length}</Typography>
                <Typography color="text.secondary">Posts</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{mockStats.followers}</Typography>
                <Typography color="text.secondary">Followers</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{mockStats.following}</Typography>
                <Typography color="text.secondary">Following</Typography>
              </Box>
            </Stack>

            {user.profile && (
              <Box>
                {user.profile.bio && (
                  <Typography variant="body1" gutterBottom>
                    {user.profile.bio}
                  </Typography>
                )}
                {user.profile.location && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    📍 {user.profile.location}
                  </Typography>
                )}
                {user.profile.interests.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {user.profile.interests.map((interest, index) => (
                      <Typography
                        key={index}
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'primary.light',
                          borderRadius: 1,
                          color: 'white',
                          fontSize: '0.875rem',
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
        </Box>

        <Divider sx={{ mb: 4 }} />

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
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <IconButton 
                      onClick={() => handleLikeClick(post.id)}
                      color={likedPosts.has(post.id) ? "primary" : "default"}
                    >
                      {likedPosts.has(post.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton 
                      onClick={() => handleSaveClick(post.id)}
                      color={savedPosts.has(post.id) ? "primary" : "default"}
                    >
                      {savedPosts.has(post.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </CardActions>
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
