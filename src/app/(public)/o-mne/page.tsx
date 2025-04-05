// robertweb/src/app/o-mne/page.tsx

import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';

export const metadata = { title: 'O mne | ZoškaGram' };

export default function About() {
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingY: 4,
        minHeight: '100vh',
        backgroundColor: '#FAFAFA',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          border: '1px solid #dbdbdb',
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* Header/Cover Photo */}
        <Box
          sx={{
            height: { xs: 120, sm: 200 },
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            position: 'relative',
          }}
        />
        
        {/* Profile Section */}
        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            pt: 0,
            pb: 4,
            position: 'relative'
          }}
        >
          {/* Profile Image */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              mb: 3,
            }}
          >
            <Box
              component="img"
              src="https://i.redd.it/i47mdetiylv51.jpg"
              alt="Profilová fotka"
              sx={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '4px solid white',
                marginTop: '-75px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backgroundColor: 'white',
              }}
            />
            
            <Box 
              sx={{ 
                ml: { xs: 0, sm: 4 }, 
                mt: { xs: 2, sm: -2 }, 
                textAlign: { xs: 'center', sm: 'left' } 
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#262626',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                Študent ZoškaGram
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#8e8e8e',
                  fontSize: '1rem',
                  mb: 1 
                }}
              >
                @student_zo_zošky
              </Typography>
              
              {/* Stats */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: { xs: 3, sm: 5 }, 
                  mt: 2,
                  justifyContent: { xs: 'center', sm: 'flex-start' } 
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#262626' }}>215</Typography>
                  <Typography variant="body2" sx={{ color: '#8e8e8e' }}>Príspevky</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#262626' }}>1.5K</Typography>
                  <Typography variant="body2" sx={{ color: '#8e8e8e' }}>Sledovatelia</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#262626' }}>348</Typography>
                  <Typography variant="body2" sx={{ color: '#8e8e8e' }}>Sleduje</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* About Section */}
          <Box sx={{ mt: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: '#262626', 
                mb: 2,
                borderLeft: '2px solid #0095f6',
                pl: 2
              }}
            >
              O mne
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#262626',
                lineHeight: 1.6,
                mb: 3
              }}
            >
              Ahoj! Som študent, ktorý sa zaujíma o technológie a programovanie.
              V súčasnosti študujem informatiku a neustále sa snažím rozvíjať svoje
              zručnosti v oblasti webového vývoja. Rád fotím, cestujem a spoznávam nové technológie.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Contact Info */}
          <Box sx={{ mt: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: '#262626', 
                mb: 2,
                borderLeft: '2px solid #0095f6',
                pl: 2
              }}
            >
              Kontaktné údaje
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: '#8e8e8e', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: '#262626' }}>
                    +421 900 123 456
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: '#8e8e8e', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: '#262626' }}>
                    gmail@gmail.com
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ color: '#8e8e8e', mr: 1, fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ color: '#262626' }}>
                    Univerzita XYZ, Bratislava
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      
      {/* Footer */}
      <Box 
        component="footer"
        sx={{ 
          textAlign: 'center',
          py: 3,
          mt: 4
        }}
      >
        <Typography variant="body2" sx={{ color: '#8e8e8e' }}>
          2025 ZoškaGram
        </Typography>
      </Box>
    </Container>
  );
}
