// src/sections/NonAuthHomeView.tsx

'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material/styles";
import { useRouter } from 'next/navigation';



export default function NonAuthHomeView() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: 3
    }}>
      <Box 
        sx={{
          padding: 4,
          backgroundColor: theme.palette.background.paper, // Dynamically set background color
          border: `1px solid ${theme.palette.divider}`, // Border color based on theme
          borderRadius: 2,
          width: '100%',
          maxWidth: 800,
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography 
            variant="h3" 
            gutterBottom 
            align="center"
            sx={{ 
              color: theme.palette.text.primary // Use theme's primary text color
            }}
          >
            Vitaje na stránkach ZoskaGram
          </Typography>

          <Typography 
            variant="body1"
            align="center"
            sx={{ 
              color: theme.palette.text.secondary, // Use secondary text color from theme
              marginBottom: 2
            }}
          >
            Prosím, prihláste sa pre prístup ku príspevkom {' '}
          <Box
            component="span"
            onClick={() => router.push('/auth/prihlasenie')}
            sx={{
              color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            tu
          </Box>
          .
          </Typography>

          <Box 
            sx={{ 
              display: 'flex',
              gap: 4,
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif'
            }}
          >
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
