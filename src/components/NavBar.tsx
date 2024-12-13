// src/components/NavBar.tsx

'use client';

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSession } from "next-auth/react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "./ThemeProvider";

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);
  const { data: session } = useSession();
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  // Check if theme.palette.pink is defined before using it
  const pinkColor = theme.palette.pink?.main || '#FF4081'; // Fallback to default pink if undefined

  const commonItems = [
    { label: "Domov", icon: <HomeIcon sx={{ color: pinkColor }} />, href: "/" },
  ];

  const authenticatedItems = [
    { label: "Hľadať", icon: <SearchIcon sx={{ color: pinkColor }} />, href: "/hladanie" },
    { label: "Profily", icon: <PersonIcon sx={{ color: pinkColor }} />, href: "/profil" },
    { label: "Pridať", icon: <AddIcon sx={{ color: pinkColor }} />, href: "/pridat" },
    { label: "Odhlásiť", icon: <LogoutIcon sx={{ color: pinkColor }} />, href: "/auth/odhlasenie" },
  ];

  const unauthenticatedItems = [
    { label: "O mne", icon: <InfoIcon sx={{ color: pinkColor }} />, href: "/o-mne" },
    { label: "Prihlásenie", icon: <LoginIcon sx={{ color: pinkColor }} />, href: "/auth/prihlasenie" },
    { label: "Registrácia", icon: <PersonAddIcon sx={{ color: pinkColor }} />, href: "/auth/registracia" },
  ];

  const navItems = [...commonItems, ...(session ? authenticatedItems : unauthenticatedItems)];

  return (
    <Box
      sx={{
        width:"100%",
        position:"fixed",
        bottom:"0",
        left:"0",
        right:"0",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        bgcolor:'background.paper',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          bgcolor:'background.paper',
          "& .MuiBottomNavigationAction-root": {
            "&.Mui-selected": {
              color:'text.primary',
            },
          },
          flexGrow:"1",
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            component={Link}
            href={item.href}
            sx={{
              minWidth:"auto",
              padding:"6px 12px",
              fontSize:"0.75rem",
            }}
          />
        ))}
      </BottomNavigation>
      <IconButton
        onClick={toggleColorMode}
        sx={{ marginRight:"1", color:'text.primary' }}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}
