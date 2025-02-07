// robertweb/src/app/podmienky/page.tsx


import Box from '@mui/material/Box';
import PodmienkyPouzivaniaView from '@/sections/PodmienkyViews';

export const metadata = { title: 'Podmienky | RobertWeb' };

export default function TermsConditions() {
  return (
    <Box sx={{ padding: '25px' }}>
      <PodmienkyPouzivaniaView />
    </Box>
  );
}



