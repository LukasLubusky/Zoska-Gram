// components/sections/PodmienkyPouzivaniaView.tsx
'use client';

import { Typography, Box, Button, Paper, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PodmienkyPouzivaniaView() {
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
          Podmienky používania
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
          Tieto podmienky upravujú pravidlá používania našej platformy a poskytovaných služieb. Pred prístupom a využívaním našich služieb si ich, prosím, dôkladne prečítajte. Používaním našej platformy súhlasíte so všetkými ustanoveniami uvedenými v týchto podmienkach.
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
          Povinnosti používateľa:
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
            Pri registrácii poskytnúť pravdivé a aktuálne informácie.
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Zabezpečiť dôvernosť svojich prihlasovacích údajov.
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Používať platformu v súlade s platnými zákonmi a týmito podmienkami.
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
          Práva a obmedzenia našej platformy:
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
            Vyhradzujeme si právo na zmenu, obmedzenie alebo ukončenie poskytovania služieb bez predchádzajúceho upozornenia.
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Máme právo monitorovať obsah a aktivitu na platforme a zasiahnuť v prípade porušenia týchto podmienok.
          </Typography>
          <Typography 
            component="li" 
            paragraph
            sx={{ 
              color: '#262626',
              mb: 1 
            }}
          >
            Naša platforma nenesie zodpovednosť za škody vzniknuté v dôsledku nesprávneho alebo neautorizovaného používania služby.
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
          Tieto podmienky môžu byť časom aktualizované, preto odporúčame pravidelne kontrolovať túto stránku. V prípade akýchkoľvek otázok alebo nejasností nás neváhajte kontaktovať.
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
