//src\sections\SignOutView.tsx

'use client';

import { useSession, signOut } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

export default function SignOutView() {
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

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
            Odhlásenie
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            Are you sure you want to sign out?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignOut}
            sx={{
              marginTop: '20px',
              bgcolor: 'error.main',
              color: 'error.contrastText',
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
