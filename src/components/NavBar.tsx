// src\components\NavBar.tsx

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
import { useSession} from 'next-auth/react';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  const { status } = useSession();

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
          bgcolor: 'background.paper',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <BottomNavigationAction label="Domov" value={'/'} icon={<HomeIcon />} />

        {status === 'authenticated' ? (
          [
            <BottomNavigationAction key="hladat" label="Hľadať" value={'/hladanie'} icon={<SearchIcon />} />,
            <BottomNavigationAction key="pridat" label="Pridať" value={'/pridat'} icon={<AddCircleIcon />} />,
            <BottomNavigationAction key="profil" label="Profil" value={'/profil'} icon={<PersonIcon />} />,
            <BottomNavigationAction key="odhlasit" label="Odhlásiť" value={'/auth/odhlasenie'} icon={<LogoutIcon />} />,
          ]
        ) : (
          [
            <BottomNavigationAction key="prispevky" label="Prispevky" value={'/prispevok'} icon={<PostAddIcon />} />,
            <BottomNavigationAction key="prihlasenie" label="Prihlásenie" value={'/auth/prihlasenie'} icon={<LoginIcon />} />,
            <BottomNavigationAction key="registracia" label="Registrácia" value={'/auth/registracia'} icon={<HowToRegIcon />} />,
          ]
        )}
      </BottomNavigation>
    </Box>
  );
}
