// // src/sections/SignOutView.tsx

'use client';

import { useSession, signOut } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function SignOutView() {
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          p: 3, // theme spacing (roughly equivalent to 24px, adjust if needed)
          boxShadow: 3,
          borderRadius: 2, // uses theme's border radius scale
          bgcolor: 'background.paper', // uses the theme's background color
          width: '350px',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Odhlásenie
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ste si istí, že sa chcete odhlásiť?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignOut}
          sx={{ mt: 2 }} // uses theme spacing for margin-top
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}

