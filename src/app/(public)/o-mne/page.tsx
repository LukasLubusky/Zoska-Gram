// robertweb/src/app/o-mne/page.tsx

import { Box, Container, Typography } from '@mui/material';

export const metadata = { title: 'O mne | RobertWeb' };

export default function About() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Photo at the top with rounded edges */}
        <Box
          component="img"
          src="https://i.redd.it/i47mdetiylv51.jpg"
          alt="Moja fotka"
          sx={{
            width: 150,
            height: 150,
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        {/* Title */}
        <Typography variant="h4" component="h1">
          O mne
        </Typography>
        {/* About description */}
        <Typography variant="body1" align="center">
          Ahoj! Som študent, ktorý sa zaujíma o technológie a programovanie.
          V súčasnosti študujem informatiku a neustále sa snažím rozvíjať svoje
          zručnosti v oblasti webového vývoja.
        </Typography>
        {/* Contact details */}
        <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
          <Typography variant="body1">Telefón: +421 900 123 456</Typography>
          <Typography variant="body1">Email: gmail@gmail.com</Typography>
          <Typography variant="body1">
            Adresa školy: Fakulta informatiky, Univerzita XYZ, Bratislava
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

