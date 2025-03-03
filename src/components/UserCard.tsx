'use client';

import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface UserCardProps {
  id: string;
  name: string | null;
  image: string | null;
  profile?: {
    bio: string | null;
    location: string | null;
    avatarUrl: string | null;
  } | null;
}

export default function UserCard({ id, name, image, profile }: UserCardProps) {
  const displayImage = profile?.avatarUrl || image || '/default-avatar.png';
  
  return (
    <Card 
      component={Link}
      href={`/profil/${id}`}
      sx={{ 
        display: 'flex',
        mb: 2,
        textDecoration: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover' }}
        image={displayImage}
        alt={name || 'Používateľ'}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {name || 'Anonymný používateľ'}
          </Typography>
          {profile?.location && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 1
              }}
            >
              <LocationOnIcon fontSize="small" />
              {profile.location}
            </Typography>
          )}
          {profile?.bio && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {profile.bio}
            </Typography>
          )}
        </CardContent>
      </Box>
    </Card>
  );
} 