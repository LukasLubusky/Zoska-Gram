// src/sections/NonAuthHomeView.tsx

'use client';

import React from 'react';
import Typography from '@mui/material/Typography';

export default function NonAuthHomeView() {
  return (
    <div>
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="body1">
        Please sign in to access your personalized home page.
      </Typography>
    </div>
  );
}
