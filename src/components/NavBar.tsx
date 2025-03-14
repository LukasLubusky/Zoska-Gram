"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import LoginIcon from "@mui/icons-material/Login"
import InfoIcon from "@mui/icons-material/Info"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import PersonIcon from "@mui/icons-material/Person"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { useColorMode } from "@/components/ThemeProvider"

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0)
  const { data: session } = useSession()
  const { toggleColorMode, mode } = useColorMode()

  const commonItems = [{ label: "Domov", icon: <HomeIcon />, href: "/" }]
  const authenticatedItems = [
    { label: "Hľadať", icon: <SearchIcon />, href: "/hladanie" },
    {
      label: "Profil",
      icon: session?.user?.image ? (
        <Image
          src={session.user.image || "/placeholder.svg"}
          alt="Profile"
          width={24}
          height={24}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <PersonIcon />
      ),
      href: "/profil",
    },
    { label: "Pridať", icon: <AddIcon />, href: "/pridat" },
    { label: "Odhlásiť", icon: <LogoutIcon />, href: "/auth/odhlasenie" },
  ]

  const unauthenticatedItems = [
    { label: "O mne", icon: <InfoIcon />, href: "/o-mne" },
    { label: "Prihlásenie", icon: <LoginIcon />, href: "/auth/prihlasenie" },
    { label: "Registrácia", icon: <PersonAddIcon />, href: "/auth/registracia" },
  ]

  // Combine the common items with the ones depending on session status.
  const navItems = [...commonItems, ...(session ? authenticatedItems : unauthenticatedItems)]

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{
          backgroundColor: "background.paper",
          "& .MuiBottomNavigationAction-root": {
            color: "text.secondary",
            "&.Mui-selected": {
              color: "primary.main",
            },
            minWidth: "auto",
            flex: 1,
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            component={Link}
            href={item.href}
          />
        ))}
        {/* Theme toggle integrated as an action */}
        <BottomNavigationAction
          key="toggle-theme"
          icon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          onClick={(event) => {
            // Prevent any default behavior if needed.
            event.preventDefault()
            toggleColorMode()
          }}
          sx={{
            // Adjust styling as needed so that it matches the other actions.
            minWidth: "auto",
            flex: 1,
          }}
        />
      </BottomNavigation>
    </Box>
  )
}









