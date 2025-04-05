'use client';

import { useSession } from 'next-auth/react';
import { Typography, Box,  Paper, Container, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';


export default function NonAuthHomeView() {
  const { status } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: '#FAFAFA' }}
      >
        <Typography variant="h6" sx={{ color: '#262626' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* Phone mockup - only show on larger screens */}
          {!isMobile && (
            <Grid item md={6} display="flex" justifyContent="center">
              <Box
                sx={{
                  position: 'relative',
                  height: 600,
                  width: 300,
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '30px',
                    border: '10px solid #000',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                  }}
                >
                  <Box
                    component="img"
                    src="/images/app-screenshot.jpg" 
                    alt="ZoškaGram App Screenshot"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top'
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null; 
                      e.currentTarget.src = 'https://via.placeholder.com/280x580/FFFFFF/888888?text=ZoškaGram';
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          )}

          {/* Login/signup section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}
            >
              {/* Logo/App Name */}
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{
                  fontFamily: "'Grand Hotel', cursive, 'Roboto', 'Helvetica', 'Arial', sans-serif",
                  color: '#262626',
                  letterSpacing: '1px',
                  mb: 3
                }}
              >
                ZoškaGram
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  padding: 4,
                  borderRadius: 1,
                  border: '1px solid #dbdbdb',
                  backgroundColor: '#fff',
                  maxWidth: 400,
                  width: '100%'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: '#262626',
                    textAlign: 'center',
                    mb: 3
                  }}
                >
                  Zdieľajte svoje školské momenty
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#8e8e8e',
                    textAlign: 'center',
                    mb: 3
                  }}
                >
                  Pripojte sa k našej rastúcej komunite študentov a pedagógov. Zostaňte v spojení s vašimi spolužiakmi.
                </Typography>
                
                <Button 
                  component={NextLink}
                  href="/auth/registracia"
                  variant="contained" 
                  fullWidth
                  sx={{
                    backgroundColor: '#0095f6',
                    borderRadius: '4px',
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#1877f2'
                    }
                  }}
                >
                  Zaregistrujte sa
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#dbdbdb' }} />
                  <Typography variant="body2" sx={{ mx: 2, color: '#8e8e8e' }}>
                    ALEBO
                  </Typography>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#dbdbdb' }} />
                </Box>

                <Button 
                  component={NextLink}
                  href="/auth/prihlasenie"
                  variant="outlined" 
                  fullWidth
                  sx={{
                    borderColor: '#dbdbdb',
                    color: '#0095f6',
                    borderRadius: '4px',
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#0095f6',
                      backgroundColor: 'rgba(0,149,246,0.1)'
                    }
                  }}
                >
                  Prihláste sa
                </Button>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  padding: 2,
                  borderRadius: 1,
                  border: '1px solid #dbdbdb',
                  backgroundColor: '#fff',
                  maxWidth: 400,
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2" sx={{ color: '#262626' }}>
                  Stiahnite si aplikáciu
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
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
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box 
        component="footer"
        sx={{ 
          textAlign: 'center',
          py: 3,
          mt: 4,
          borderTop: '1px solid #dbdbdb'
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
