// robertweb/src/app/gdpr/page.tsx

import { Box, Container } from '@mui/material';
import GDPRView from '@/sections/GDPRView';

export const metadata = { title: 'GDPR | ZoškaGram' };

export default function TermsConditions() {
  return (
    <Box sx={{ 
      backgroundColor: '#FAFAFA',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <GDPRView />
      </Container>
    </Box>
  );
}