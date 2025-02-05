// src\sections\AboutView.tsx

"use client"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from "@mui/material/styles";

export default function AboutContent() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: 3
    }}>
      <Box 
        sx={{
          padding: 4,
          backgroundColor: theme.palette.background.paper, // Dynamically set background color
          border: `1px solid ${theme.palette.divider}`, // Border color based on theme
          borderRadius: 2,
          width: '100%',
          maxWidth: 800,
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography 
            variant="h3" 
            gutterBottom 
            align="center"
            sx={{ 
              color: theme.palette.text.primary // Use theme's primary text color
            }}
          >
            O mne
          </Typography>

          <Typography 
            variant="body1"
            align="center"
            sx={{ 
              color: theme.palette.text.secondary, // Use secondary text color from theme
              marginBottom: 2
            }}
          >
            Vitajte na stránkach ZoskaGram! <br></br> Lorem ipsum odor amet, consectetuer adipiscing elit. Venenatis enim facilisi aenean venenatis sapien rhoncus. Laoreet odio ridiculus vivamus mus non.
          </Typography>

          <Box 
            sx={{ 
              display: 'flex',
              gap: 4,
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <Link 
              href="https://zochova.sk/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Naša škola
            </Link>
            <Link 
              href="https://www.facebook.com/spsezochova/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Facebook
            </Link>
            <Link 
              href="https://www.instagram.com/spsezochova/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Instagram
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
