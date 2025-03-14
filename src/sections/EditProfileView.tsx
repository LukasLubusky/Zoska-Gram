'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Profile {
  name: string | null;
  bio: string | null;
  location: string | null;
  image: string | null;
}

interface EditProfileViewProps {
  userId: string;
}

export default function EditProfileView({ userId }: EditProfileViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: '',
    bio: '',
    location: '',
    image: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile({
          name: data.name || '',
          bio: data.profile?.bio || '',
          location: data.profile?.location || '',
          image: data.image,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          location: profile.location,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess(true);
      // Navigate back to profile page after successful update
      setTimeout(() => {
        router.push(`/profil/${userId}`);
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Typography variant="h4" gutterBottom>
              Upraviť profil
            </Typography>

            <Avatar
              src={profile.image || '/default-avatar.png'}
              alt={profile.name || 'User'}
              sx={{ width: 120, height: 120 }}
            />

            <TextField
              fullWidth
              label="Meno"
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Bio"
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              multiline
              rows={4}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Lokalita"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              variant="outlined"
            />

            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ width: '100%' }}>
                Profil bol úspešne aktualizovaný!
              </Alert>
            )}

            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push(`/profil/${userId}`)}
              >
                Späť
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saving}
              >
                {saving ? 'Ukladám...' : 'Uložiť zmeny'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
