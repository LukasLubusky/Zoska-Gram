'use client';

import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface ProfileViewProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    profile?: {
      bio: string | null;
      location: string | null;
      avatarUrl: string | null;
    } | null;
    posts: Array<{
      id: string;
      imageUrl: string;
      caption: string | null;
      createdAt: Date;
    }>;
  };
}

export default function ProfileView({ user }: ProfileViewProps) {
  const displayImage = user.profile?.avatarUrl || user.image || '/default-avatar.png';
  const joinDate = new Date(user.createdAt).toLocaleDateString('sk-SK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
          <Avatar
            src={displayImage}
            alt={user.name || 'Používateľ'}
            sx={{ width: 150, height: 150 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {user.name || 'Anonymný používateľ'}
            </Typography>
            
            {user.profile?.location && (
              <Typography 
                variant="body1" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 1 
                }}
              >
                <LocationOnIcon color="action" />
                {user.profile.location}
              </Typography>
            )}
            
            <Typography 
              variant="body1" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 1 
              }}
            >
              <EmailIcon color="action" />
              {user.email}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}
            >
              <CalendarTodayIcon color="action" />
              Členom od {joinDate}
            </Typography>
          </Box>
        </Box>

        {user.profile?.bio && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              O mne
            </Typography>
            <Typography variant="body1">
              {user.profile.bio}
            </Typography>
          </Box>
        )}

        <Box>
          <Typography variant="h6" gutterBottom>
            Príspevky ({user.posts.length})
          </Typography>
          <Grid container spacing={2}>
            {user.posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Paper 
                  elevation={2}
                  sx={{
                    aspectRatio: '1',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Box
                    component="img"
                    src={post.imageUrl}
                    alt={post.caption || 'Príspevok'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
} 