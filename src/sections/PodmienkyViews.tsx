// components/sections/PodmienkyPouzivaniaView.tsx
'use client';

import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PodmienkyPouzivaniaView() {
  const router = useRouter();
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh', // Odpočítanie výšky navigačného panela
        p: 3,
        mt: 2
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
          gap: 2,
          mb: 4
        }}
      >
        <Typography variant="h4" gutterBottom>
          Podmienky používania
        </Typography>

        <Typography variant="body1" paragraph>
          Tieto podmienky upravujú pravidlá používania našej platformy a poskytovaných služieb. Pred prístupom a využívaním našich služieb si ich, prosím, dôkladne prečítajte. Používaním našej platformy súhlasíte so všetkými ustanoveniami uvedenými v týchto podmienkach.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Povinnosti používateľa:
        </Typography>

        <Box component="ul" sx={{ marginLeft: 3, my: 0 }}>
          <Typography component="li" paragraph>
            Pri registrácii poskytnúť pravdivé a aktuálne informácie.
          </Typography>
          <Typography component="li" paragraph>
            Zabezpečiť dôvernosť svojich prihlasovacích údajov.
          </Typography>
          <Typography component="li" paragraph>
            Používať platformu v súlade s platnými zákonmi a týmito podmienkami.
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Práva a obmedzenia našej platformy:
        </Typography>

        <Box component="ul" sx={{ marginLeft: 3, my: 0 }}>
          <Typography component="li" paragraph>
            Vyhradzujeme si právo na zmenu, obmedzenie alebo ukončenie poskytovania služieb bez predchádzajúceho upozornenia.
          </Typography>
          <Typography component="li" paragraph>
            Máme právo monitorovať obsah a aktivitu na platforme a zasiahnuť v prípade porušenia týchto podmienok.
          </Typography>
          <Typography component="li" paragraph>
            Naša platforma nenesie zodpovednosť za škody vzniknuté v dôsledku nesprávneho alebo neautorizovaného používania služby.
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Tieto podmienky môžu byť časom aktualizované, preto odporúčame pravidelne kontrolovať túto stránku. V prípade akýchkoľvek otázok alebo nejasností nás neváhajte kontaktovať.
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
