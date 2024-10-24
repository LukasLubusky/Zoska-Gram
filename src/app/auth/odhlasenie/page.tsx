"use client"; // Keep this directive

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Odhlásenie
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => signOut()}
      >
        Odhlásiť sa
      </Button>
    </>
  );
}
