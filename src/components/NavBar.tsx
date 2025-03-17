"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { useColorMode } from "@/components/ThemeProvider"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { signOut } from "next-auth/react"

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0)
  const { data: session } = useSession()
  const { toggleColorMode, mode } = useColorMode()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleClose()
    await signOut({ callbackUrl: "/" })
  }

  const navItems = [
    { label: "Domov", icon: <HomeIcon />, href: "/" },
    { label: "Hľadať", icon: <SearchIcon />, href: "/hladanie" },
    { label: "Pridať", icon: <AddIcon />, href: "/pridat" },
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
      onClick: handleProfileClick,
    },
  ]

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
            {...(item.href ? { component: Link, href: item.href } : {})}
            onClick={item.onClick}
          />
        ))}
      </BottomNavigation>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem component={Link} href="/profil" onClick={handleClose}>
          <PersonIcon sx={{ mr: 1 }} /> Profil
        </MenuItem>
        <MenuItem 
          component={Link} 
          href={`/profil/${session?.user?.id}/saved/allPosts`} 
          onClick={handleClose}
        >
          <BookmarkIcon sx={{ mr: 1 }} /> Saved Posts
        </MenuItem>
        <MenuItem onClick={toggleColorMode}>
          {mode === "dark" ? <Brightness7Icon sx={{ mr: 1 }} /> : <Brightness4Icon sx={{ mr: 1 }} />}
          Theme
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} /> Log out
        </MenuItem>
      </Menu>
    </Box>
  )
}
