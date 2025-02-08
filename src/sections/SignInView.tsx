// // src/sections/SignInView.tsx

'use client';

import { signIn } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';

export default function SignInView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Box
        textAlign="center"
        p={3}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"  // Uses theme's background setting
        width="400px"
      >
        <Typography variant="h4" gutterBottom>
          Prihlásenie
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => signIn('google')}
          sx={{ mt: 2 }}  // Using theme spacing (mt: 2 = theme.spacing(2))
        >
          Sign in with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Nemáte účet?{' '}
          <MuiLink 
            component={NextLink} 
            href="/auth/registracia" 
            underline="none"
            sx={{ cursor: 'pointer', fontWeight: 'bold', color: 'primary.main' }}
          >
            Registrujte sa
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}


