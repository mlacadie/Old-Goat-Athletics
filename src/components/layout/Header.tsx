'use client'

import { useState, type ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Slide,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { UserButton, useAuth } from '@clerk/nextjs'
import { colors } from '../../theme'
import { NAV_LINKS } from '../../data/navLinks'

const navButtonSx = {
  color: 'rgba(255,255,255,0.88)',
  px: 1.75,
  fontWeight: 600,
  borderRadius: 2,
  '&:hover': {
    color: '#fff',
    bgcolor: 'rgba(255,255,255,0.08)',
  },
}

const drawerTextProps = {
  primary: {
    sx: { color: '#fff', fontWeight: 700, fontSize: '1.1rem' },
  },
}

function HideOnScroll({ children }: { children: ReactElement }) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

/** The signed-in User's avatar menu, with Profile and Sign out. */
function AccountMenu() {
  return <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { isLoaded, isSignedIn } = useAuth()
  const showSignIn = isLoaded && !isSignedIn
  const showAccount = isLoaded && isSignedIn
  const scrollTriggered = useScrollTrigger({ disableHysteresis: true, threshold: 8 })
  const pathname = usePathname()
  const scrolled = scrollTriggered || pathname !== '/'
  const closeMenu = () => setOpen(false)

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: scrolled ? colors.navyDarker : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          borderBottom: scrolled ? 'none' : `1px solid rgba(255,255,255,0.12)`,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 8 } }}>
          <Toolbar disableGutters sx={{ py: 1, gap: 2 }}>
            <Box
              component={Link}
              href="/#top"
              aria-label="Old Goat Athletics home"
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1,
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              <Box
                component="img"
                src="/logos/oldGoat.svg"
                alt=""
                sx={{
                  width: 55,
                  height: 'auto',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              <Box
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  letterSpacing: '0.04em',
                  color: '#fff',
                  lineHeight: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                OLD GOAT
                <br />
                ATHLETICS
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                ml: 'auto',
              }}
            >
              {NAV_LINKS.map((link) => (
                <Button key={link.href} component={Link} href={link.href} sx={navButtonSx}>
                  {link.label}
                </Button>
              ))}
              {showSignIn && (
                <Button
                  component={Link}
                  href="/sign-in"
                  variant="contained"
                  sx={{
                    ml: 1,
                    bgcolor: colors.gold,
                    color: colors.navyDarker,
                    '&:hover': { bgcolor: colors.goldLight },
                  }}
                >
                  Sign in
                </Button>
              )}
              {showAccount && (
                <Box sx={{ ml: 1.5, display: 'flex' }}>
                  <AccountMenu />
                </Box>
              )}
            </Box>

            {showAccount && (
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <AccountMenu />
              </Box>
            )}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>

        <Drawer
          anchor="right"
          open={open}
          onClose={closeMenu}
          slotProps={{
            paper: {
              sx: { bgcolor: colors.navyDarker, width: 280 },
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
            <IconButton onClick={closeMenu} sx={{ color: '#fff' }} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={closeMenu}>
                  <ListItemText primary={link.label} slotProps={drawerTextProps} />
                </ListItemButton>
              </ListItem>
            ))}
            {showSignIn && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/sign-in" onClick={closeMenu}>
                    <ListItemText primary="Sign in" slotProps={drawerTextProps} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} href="/sign-up" onClick={closeMenu}>
                    <ListItemText primary="Sign up" slotProps={drawerTextProps} />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {showAccount && (
              <ListItem disablePadding>
                <ListItemButton component={Link} href="/profile" onClick={closeMenu}>
                  <ListItemText primary="Profile" slotProps={drawerTextProps} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  )
}
