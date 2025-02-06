// // src/sections/SignInView.tsx

// 'use client'; // Ensure this is a client component

// import { signIn } from 'next-auth/react';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';


// export default function SignInView() {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '20%' }}>
//       <Typography variant="h4" gutterBottom>
//         Prihlásenie
//       </Typography>
//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={() => signIn('google')} // Trigger Google sign-in
//         style={{ marginTop: '20px' }}
//       >
//         Sign in with Google
//       </Button>
//     </div>
//   );
// }

'use client';

import { signIn } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function SignInView() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        textAlign="center"
        padding="30px"
        boxShadow={3}
        borderRadius="8px"
        bgcolor="white"
        width="400px"
      >
        <Typography variant="h4" gutterBottom>
          Prihlásenie
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => signIn('google')}
          style={{ marginTop: '20px' }}
        >
          Sign in with Google
        </Button>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '20px' }}>
          Nemáte účet?{' '}
          <Link href="/auth/registracia" passHref>
            <Typography 
              component="span" 
              color="primary" 
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
              Registrujte sa
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

