// src/app/auth/prihlasenie/page.tsx

"use client";  // Keep this as a client component

import Head from 'next/head';  // Use Head component to manage the title
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react';

export default function LogIn() {
  return (
    <>
      <Head>
        <title>Prihlásenie | ZoskaGram</title>  {/* Set the title here */}
      </Head>
      <Typography variant="h4" gutterBottom>
        Prihlásenie
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </Button>
    </>
  );
}
