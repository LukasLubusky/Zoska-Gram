'use client';

import { useSession } from 'next-auth/react';
import { Typography, Box, Link, Paper } from '@mui/material';
import NextLink from 'next/link';

export default function NonAuthHomeView() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={3}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: 3,
          maxWidth: 800,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Vítajte na ZoškaGram
        </Typography>
        
        <Typography variant="body1" gutterBottom>
          Pripojte sa k našej rastúcej komunite študentov a pedagógov. ZoškaGram je miesto, 
          kde môžete zdieľať svoje školské zážitky, spolupracovať na projektoch a zostať v spojení 
          s vašimi spolužiakmi.
        </Typography>
        
        <Typography variant="body2" gutterBottom>
          Staňte sa súčasťou jedinečnej školskej sociálnej siete, kde každý príspevok a interakcia 
          pomáha budovať silnejšiu študentskú komunitu.
        </Typography>

        <Typography variant="body1">
          Môžeš sa{' '}
          <Link
            component={NextLink}
            href="/auth/registracia"
            sx={{
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            zaregistrovať tu
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
