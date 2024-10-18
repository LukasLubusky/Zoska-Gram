// src/app/auth/registracia/page.tsx


import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react';

export const metadata = { title: 'Registrácia | ZoskaGram' };

export default function SignUp() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Registrácia
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => signIn('google')}
      >
        Sign up with Google
      </Button>
    </>
  );
}
