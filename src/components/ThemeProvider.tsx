// src/components/ThemeProvider.tsx

'use client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { ReactNode, useState, useMemo, createContext, useContext } from 'react';

// Extend the Palette interface to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    pink: Palette['primary'];
  }
  interface PaletteOptions {
    pink?: PaletteOptions['primary'];
  }
}

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#1976d2' : '#1565c0', // Blue in light, slightly darker blue in dark
    },
    secondary: {
      main: mode === 'light' ? '#dc004e' : '#1565c0', // Matching dark mode secondary color
    },
    pink: {
      main: '#FF4081', // Keeping pink, but it's not used in primary anymore
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212', // White in light, dark gray in dark
      paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e', // Light gray for cards in light, darker in dark
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff', // Ensures text is readable
      secondary: mode === 'light' ? '#444' : '#bbbbbb',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          textTransform: 'none', // No uppercase transformation
        },
      },
    },
  },
});

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}


