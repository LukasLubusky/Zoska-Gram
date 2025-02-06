'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Link from 'next/link';

export default function SignUpView() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);

  const handleSignUp = () => {
    if (!agreed) {
      setError(true);
      return;
    }
    signIn('google');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        textAlign="center"
        padding="30px"
        boxShadow={3}
        borderRadius="8px"
        bgcolor="white"
        maxWidth="500px"
      >
        <Typography variant="h4" gutterBottom>
          Registrácia
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                setError(false);
              }}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              Súhlasím s <Link href="/gdpr" passHref><Typography component="span" color="primary" style={{ cursor: 'pointer', fontWeight: 'bold' }}>GDPR</Typography></Link> a {' '}
              <Link href="/podmienky" passHref><Typography component="span" color="primary" style={{ cursor: 'pointer', fontWeight: 'bold' }}>Podmienkami používania</Typography></Link>
            </Typography>
          }
        />

        {error && (
          <Alert severity="error" style={{ marginTop: '10px' }}>
            Musíte súhlasiť s podmienkami používania.
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          style={{ marginTop: '20px', opacity: agreed ? 1 : 0.5 }}
        >
          Register with Google
        </Button>

        <Typography variant="body2" color="textSecondary" style={{ marginTop: '20px' }}>
          Máte už účet?{' '}
          <Link href="/auth/prihlasenie" passHref>
            <Typography
              component="span"
              color="primary"
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              Prihláste sa
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}


