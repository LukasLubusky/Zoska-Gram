// components/views/GDPRView.tsx
'use client';

import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GDPRView() {
  const router = useRouter();
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
        minHeight: '100vh', // Subtracting navbar height
        p: 3,
        mt: 2 // Added margin top
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '800px',
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // Reduced gap from 3 to 2
          mb: 4 // Added margin bottom for spacing
        }}
      >
        <Typography variant="h4" gutterBottom> {/* Reduced from h3 to h4 */}
          Ochrana osobných údajov (GDPR)
        </Typography>

        <Typography variant="body1" paragraph>
          V súlade s nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 o ochrane fyzických osôb 
          pri spracúvaní osobných údajov vás informujeme o spracovaní vašich osobných údajov.
        </Typography>

        <Typography variant="h6" gutterBottom> {/* Reduced from h5 to h6 */}
          Spracovávané osobné údaje:
        </Typography>

        <Box component="ul" sx={{ marginLeft: 3, my: 0 }}>
          <Typography component="li" paragraph>
            Meno a priezvisko
          </Typography>
          <Typography component="li" paragraph>
            E-mailová adresa
          </Typography>
          <Typography component="li" paragraph>
            Profilová fotografia (voliteľné)
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Účel spracovania údajov:
        </Typography>

        <Box component="ul" sx={{ marginLeft: 3, my: 0 }}>
          <Typography component="li" paragraph>
            Vytvorenie a správa používateľského účtu
          </Typography>
          <Typography component="li" paragraph>
            Poskytovanie služieb sociálnej siete
          </Typography>
          <Typography component="li" paragraph>
            Zabezpečenie komunikácie medzi používateľmi
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Vaše práva:
        </Typography>

        <Box component="ul" sx={{ marginLeft: 3, my: 0 }}>
          <Typography component="li" paragraph>
            Právo na prístup k vašim osobným údajom
          </Typography>
          <Typography component="li" paragraph>
            Právo na opravu nesprávnych údajov
          </Typography>
          <Typography component="li" paragraph>
            Právo na vymazanie údajov (právo na zabudnutie)
          </Typography>
          <Typography component="li" paragraph>
            Právo na obmedzenie spracovania
          </Typography>
          <Typography component="li" paragraph>
            Právo na prenosnosť údajov
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Vaše osobné údaje spracovávame len na nevyhnutne potrebný čas a v súlade s platnými 
          právnymi predpismi. Údaje chránime pomocou moderných technických a organizačných opatrení.
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="contained"
          sx={{ 
            mt: 2,
            alignSelf: 'flex-start'
          }}
        >
          Späť
        </Button>
      </Box>
    </Box>
  );
}


