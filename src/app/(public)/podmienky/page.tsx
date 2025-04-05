// robertweb/src/app/podmienky/page.tsx


import { Box, Container } from '@mui/material';
import PodmienkyPouzivaniaView from '@/sections/PodmienkyViews';

export const metadata = { title: 'Podmienky | ZoškaGram' };

export default function TermsConditions() {
  return (
    <Box sx={{ 
      backgroundColor: '#FAFAFA',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <PodmienkyPouzivaniaView />
      </Container>
    </Box>
  );
}
