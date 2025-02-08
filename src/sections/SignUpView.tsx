'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar,
  Link,
} from '@mui/material';
import NextLink from 'next/link';

export default function SignUpView() {
  const [agreed, setAgreed] = useState(false);
  const [flashOpen, setFlashOpen] = useState(false);

  const handleSignUp = () => {
    if (!agreed) {
      setFlashOpen(true);
      return;
    }
    signIn('google');
  };

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
          p: 4,
          borderRadius: 4,
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Registrácia
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              Súhlasím s{' '}
              <Link
                component={NextLink}
                href="/gdpr"
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                GDPR
              </Link>{' '}
              a{' '}
              <Link
                component={NextLink}
                href="/podmienky"
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Podmienkami používania
              </Link>
            </Typography>
          }
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          // The opacity is lowered when the checkbox isn't checked
          sx={{ mt: 2, opacity: agreed ? 1 : 0.6 }}
        >
          Register with Google
        </Button>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Máte už účet?{' '}
          <Link
            component={NextLink}
            href="/auth/prihlasenie"
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Prihláste sa
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={flashOpen}
        autoHideDuration={3000}
        onClose={() => setFlashOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setFlashOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          Musíte súhlasiť s podmienkami používania.
        </Alert>
      </Snackbar>
    </Box>
  );
}



