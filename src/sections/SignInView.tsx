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
import Link from '@mui/material/Link';
import { useTheme as useNextTheme } from "next-themes";

export default function SignInView() {
  const { theme } = useNextTheme();
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn('google', { redirect: false, callbackUrl: '/' });
    if (result?.ok) {
      router.push('/');
    } else {
      console.error('Sign-in failed', result?.error);
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
          <Typography 
            variant="body2"
            sx={{ color: 'text.primary',
              marginTop: '20px'
            }} // This ensures it respects MUI theme colors
          >
            Nemáte účet?{' '}
            <Link
              href="/registracia"
              onClick={(e) => {
                e.preventDefault();
                router.push('registracia');
              }}
              sx={{
                color: theme === 'dark' ? '#90caf9' : '#1976d2',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Registrujte sa tu
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
