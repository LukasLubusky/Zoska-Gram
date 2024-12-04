// src/sections/AuthHomeView.tsx

'use client';

import { useSession } from 'next-auth/react';
import Typography from '@mui/material/Typography';

export default function AuthHomeView() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <Typography variant="h4">Hello, {session?.user?.name}!</Typography>
    </div>
  );
}