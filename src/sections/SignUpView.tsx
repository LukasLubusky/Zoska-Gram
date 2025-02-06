// src/sections/SignUpView.tsx

'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';


export default function SignUpView() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!acceptTerms) {
      alert('Please accept the terms and conditions to proceed.');
      return; // Exit the function if terms are not accepted
    }

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
            Registrácia
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            Please sign up using your Google account.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                I accept the{' '}
                <Link href="/podmienky" color="primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/gdpr" color="primary">
                  GDPR Policy
                </Link>
              </Typography>
            }
            sx={{ marginTop: 2, marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp} // Always clickable
            sx={{
              marginTop: '20px',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Register with Google
          </Button>
          <br></br>
          <Typography 
            variant="body2"
            sx={{ color: 'text.primary',
                  marginTop: '20px'
            }} // This ensures it respects MUI theme colors
          >
            Už máte účet?{' '}
            <Link
              href="/prihlasenie"
              onClick={(e) => {
                e.preventDefault();
                router.push('prihlasenie');
              }}
              sx={{
                color: 'primary.main', // Uses theme-based color dynamically
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: 'primary.dark' }, // Darker shade on hover
              }}
            >
              Prihláste sa tu
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

