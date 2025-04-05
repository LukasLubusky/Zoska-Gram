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
  Container,
  
} from '@mui/material';
import NextLink from 'next/link';
import GoogleIcon from '@mui/icons-material/Google';

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
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {/* Logo/App Name */}
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            fontFamily: "'Grand Hotel', cursive, 'Roboto', 'Helvetica', 'Arial', sans-serif",
            color: '#262626',
            letterSpacing: '1px',
            mb: 3,
            fontSize: { xs: '2.5rem', sm: '3rem' }
          }}
        >
          ZoškaGram
        </Typography>
        
        {/* Registration Box */}
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            borderRadius: 1,
            border: '1px solid #dbdbdb',
            backgroundColor: '#fff',
            maxWidth: 400,
            width: '100%',
            mb: 2
          }}
        >
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              color: '#262626', 
              fontWeight: 600, 
              mb: 1 
            }}
          >
            Registrácia
          </Typography>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              color: '#8e8e8e', 
              mb: 3 
            }}
          >
            Zaregistrujte sa a zdieľajte svoje momenty so spolužiakmi.
          </Typography>

          {/* Google Register Button */}
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleSignUp}
            sx={{
              backgroundColor: agreed ? '#0095f6' : 'rgba(0, 149, 246, 0.7)',
              borderRadius: '4px',
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              my: 2,
              '&:hover': {
                backgroundColor: agreed ? '#1877f2' : 'rgba(0, 149, 246, 0.8)'
              }
            }}
          >
            Registrovať sa cez Google
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#dbdbdb' }} />
            <Typography variant="body2" sx={{ mx: 2, color: '#8e8e8e', fontWeight: 500 }}>
              PODMIENKY
            </Typography>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#dbdbdb' }} />
          </Box>
          
          {/* Terms and Conditions */}
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                sx={{
                  color: '#8e8e8e',
                  '&.Mui-checked': {
                    color: '#0095f6',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#262626' }}>
                Súhlasím s{' '}
                <Link
                  component={NextLink}
                  href="/gdpr"
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#0095f6',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#00376b'
                    }
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
                    color: '#0095f6',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#00376b'
                    }
                  }}
                >
                  Podmienkami používania
                </Link>
              </Typography>
            }
          />
          
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2, 
              color: '#8e8e8e', 
              fontSize: '0.75rem',
              textAlign: 'center'
            }}
          >
            Registráciou súhlasíte s našimi podmienkami používania a zásadami ochrany osobných údajov.
          </Typography>
        </Paper>

        {/* Sign In Box */}
        <Paper
          elevation={0}
          sx={{
            padding: 3,
            borderRadius: 1,
            border: '1px solid #dbdbdb',
            backgroundColor: '#fff',
            maxWidth: 400,
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Typography variant="body1" sx={{ color: '#262626' }}>
            Máte už účet?{' '}
            <Link
              component={NextLink}
              href="/auth/prihlasenie"
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#0095f6',
                textDecoration: 'none',
                '&:hover': {
                  color: '#00376b'
                }
              }}
            >
              Prihláste sa
            </Link>
          </Typography>
        </Paper>

        {/* App Download Box */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#262626', mb: 2 }}>
            Stiahnite si aplikáciu
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Box
              component="img"
              src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png"
              alt="App Store"
              sx={{ height: 40 }}
            />
            <Box
              component="img"
              src="https://static.cdninstagram.com/rsrc.php/v3/yw/r/LBxTdceDfgS.png"
              alt="Google Play"
              sx={{ height: 40 }}
            />
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        component="footer"
        sx={{ 
          textAlign: 'center',
          py: 3,
          mt: 'auto',
          width: '100%'
        }}
      >
        <Container>
          <Typography variant="body2" sx={{ color: '#8e8e8e' }}>
            2025 ZoškaGram
          </Typography>
        </Container>
      </Box>

      <Snackbar
        open={flashOpen}
        autoHideDuration={3000}
        onClose={() => setFlashOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setFlashOpen(false)}
          severity="error"
          sx={{ 
            width: '100%',
            backgroundColor: '#ed4956',
            color: 'white'
          }}
        >
          Musíte súhlasiť s podmienkami používania.
        </Alert>
      </Snackbar>
    </Box>
  );
}
