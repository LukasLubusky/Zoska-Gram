// src/app/(home)/page.tsx

"use client"; // Indicate this is a Client Component

import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { Container } from '@mui/material';

export default function Home() {
  const { data: session, status } = useSession(); // Fetch session and status

  return (
    <Container>
      {status === 'loading' && <Typography variant="h5">Načítava sa...</Typography>}

      {status === 'authenticated' ? (
        <>
          <Typography variant="h4">Vitaj späť, {session?.user?.name}!</Typography> {/* Using session here */}
          <Typography variant="body1">Tu sú novinky pre teba.</Typography>
          {/* Additional content for logged-in users */}
        </>
      ) : (
        <>
          <Typography variant="h4">Vitaj na ZoškaGrame!</Typography>
          <Typography variant="body1">Prihlás sa, aby si získal viac funkcií.</Typography>
          {/* Additional content for logged-out users */}
        </>
      )}
    </Container>
  );
}

