"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signOut } from 'next-auth/react';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  const { data: session, status } = useSession(); // Fetch session status

  const handleNavigation = (newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
        sx={{
          bgcolor: 'background.paper', // Ensure the background is visible
          borderTop: '1px solid rgba(0, 0, 0, 0.12)', // Add a border for better visibility
          paddingBottom: 2, // Adjust padding as needed
        }}
      >
        {/* Visible for both logged in and logged out users */}
        <BottomNavigationAction
          label="Domov"
          value={'/'}
          icon={<HomeIcon />}
          sx={{ color: 'text.primary' }} // Set a visible color for text/icon
        />

        {status === 'authenticated' ? (
          <>
            {/* Logged in state */}
            <BottomNavigationAction
              label="Hľadať"
              value={'/hladat'}
              icon={<SearchIcon />}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
            <BottomNavigationAction
              label="Pridať"
              value={'/pridat'}
              icon={<AddCircleIcon />}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
            <BottomNavigationAction
              label="Profil"
              value={'/profil'}
              icon={<PersonIcon />}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
            <BottomNavigationAction
              label="Odhlásiť"
              onClick={() => signOut()}
              icon={<LogoutIcon />}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
          </>
        ) : (
          <>
            {/* Logged out state */}
            <BottomNavigationAction
              label="Prispevky"
              value={'/prispevok'}
              icon={<PostAddIcon />}
              onClick={() => handleNavigation('/prispevok')}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
            <BottomNavigationAction
              label="Prihlásenie"
              value={'/auth/prihlasenie'}
              icon={<LoginIcon />}
              onClick={() => handleNavigation('/auth/prihlasenie')}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
            <BottomNavigationAction
              label="Registrácia"
              value={'/auth/registracia'}
              icon={<HowToRegIcon />}
              onClick={() => handleNavigation('/auth/registracia')}
              sx={{ color: 'text.primary' }} // Set a visible color for text/icon
            />
          </>
        )}
      </BottomNavigation>
    </Box>
  );
}
