// src/sections/SignInView.tsx

'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignInView() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn('google', { callbackUrl: '/' });
    if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Card
        sx={{
          width: 400,
          padding: '20px',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Prihlásenie
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            Please sign in using your Google account.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            startIcon={<GoogleIcon />}
            sx={{
              marginTop: '20px',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
