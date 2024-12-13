// src\sections\AuthHomeView.tsx

'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';

export default function AuthHomeView() {
  const { data: session } = useSession();

  return (
    <div>
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome, {session?.user?.name || 'User'}!
      </Typography>
      <Typography variant="body1">
        You are signed in. This is your personalized home page.
      </Typography>
    </div>
  );
}
