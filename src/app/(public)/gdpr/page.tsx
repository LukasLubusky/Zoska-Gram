

// robertweb/src/app/podmienky/page.tsx


import Box from '@mui/material/Box';
import GDPRView from '@/sections/GDPRView';

export const metadata = { title: 'GDPR | RobertWeb' };

export default function TermsConditions() {
  return (
    <Box sx={{ padding: '25px' }}>
      <GDPRView />
    </Box>
  );
}