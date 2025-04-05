'use client';

import { signIn } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { Paper, Container} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignInView() {

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

        {/* Login Box */}
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
              mb: 3 
            }}
          >
            Prihlásenie
          </Typography>

          {/* Google Login Button */}
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => signIn('google')}
            sx={{
              backgroundColor: '#0095f6',
              borderRadius: '4px',
              py: 1.2,
              mb: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              '&:hover': {
                backgroundColor: '#1877f2'
              }
            }}
          >
            Prihlásiť sa cez Google
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#dbdbdb' }} />
            <Typography variant="body2" sx={{ mx: 2, color: '#8e8e8e', fontWeight: 500 }}>
              ALEBO
            </Typography>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#dbdbdb' }} />
          </Box>

          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              color: '#262626', 
              fontWeight: 400, 
              my: 2 
            }}
          >
            Pre registráciu alebo prihlásenie použite svoj Google účet.
          </Typography>
        </Paper>

        {/* Sign Up Box */}
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
            Nemáte účet?{' '}
            <MuiLink 
              component={NextLink} 
              href="/auth/registracia" 
              underline="none"
              sx={{ 
                cursor: 'pointer', 
                fontWeight: 'bold', 
                color: '#0095f6',
                '&:hover': {
                  color: '#00376b'
                }
              }}
            >
              Registrujte sa
            </MuiLink>
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
    </Box>
  );
}
