// components/views/GDPRView.tsx
'use client';

import { Typography, Box, Button, Paper, Divider} from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GDPRView() {
  const router = useRouter();
  
  return (
    <Box 
      sx={{ 
        paddingY: 4,
      }}
    >
      <Typography 
        variant="h2" 
        component="h1" 
        align="center"
        sx={{
          fontFamily: "'Grand Hotel', cursive, 'Roboto', 'Helvetica', 'Arial', sans-serif",
          color: '#262626',
          letterSpacing: '1px',
          mb: 4,
          fontSize: { xs: '2.5rem', sm: '3rem' }
        }}
      >
        ZoškaGram
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto',
          borderRadius: 1,
          border: '1px solid #dbdbdb',
          backgroundColor: '#fff',
          p: { xs: 3, sm: 4 },
          mb: 4
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#262626', 
            fontWeight: 600,
            mb: 3,
            borderLeft: '3px solid #0095f6',
            pl: 2,
          }}
        >
          Ochrana osobných údajov (GDPR)
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: '#262626',
            lineHeight: 1.6 
          }}
        >
          V súlade s nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 o ochrane fyzických osôb 
          pri spracúvaní osobných údajov vás informujeme o spracovaní vašich osobných údajov.
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: '#262626', 
            fontWeight: 600,
            mt: 4,
            mb: 2 
          }}
        >
          Spracovávané osobné údaje:
        </Typography>

        <Box component="ul" sx={{ pl: 4, my: 0 }}>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Meno a priezvisko
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            E-mailová adresa
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Profilová fotografia (voliteľné)
          </Typography>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            color: '#262626', 
            fontWeight: 600,
            mt: 4,
            mb: 2 
          }}
        >
          Účel spracovania údajov:
        </Typography>

        <Box component="ul" sx={{ pl: 4, my: 0 }}>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Vytvorenie a správa používateľského účtu
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Poskytovanie služieb sociálnej siete
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Zabezpečenie komunikácie medzi používateľmi
          </Typography>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            color: '#262626', 
            fontWeight: 600,
            mt: 4,
            mb: 2 
          }}
        >
          Vaše práva:
        </Typography>

        <Box component="ul" sx={{ pl: 4, my: 0 }}>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Právo na prístup k vašim osobným údajom
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Právo na opravu nesprávnych údajov
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Právo na vymazanie údajov (právo na zabudnutie)
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Právo na obmedzenie spracovania
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Právo na prenosnosť údajov
          </Typography>
        </Box>

        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: '#262626',
            lineHeight: 1.6,
            mt: 3 
          }}
        >
          Vaše osobné údaje spracovávame len na nevyhnutne potrebný čas a v súlade s platnými 
          právnymi predpismi. Údaje chránime pomocou moderných technických a organizačných opatrení.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="contained"
          sx={{ 
            mt: 2,
            backgroundColor: '#0095f6',
            '&:hover': {
              backgroundColor: '#1877f2'
            },
            borderRadius: '4px',
            py: 1,
            px: 3,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Späť
        </Button>
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
          &copy; 2025 ZoškaGram
        </Typography>
      </Box>
    </Box>
  );
}
