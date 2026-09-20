import { useState } from 'react'
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
import NorthEastIcon from '@mui/icons-material/NorthEast'
import { colors } from '../theme.js'


const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'I ___ Now', href: '#i-now' },
  { label: 'Merch', href: '#merch' },
  { label: 'Track Club', href: '#track-club' },
  { label: 'Socials', href: '#socials' },
]

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 })

  const handleNavClick = (href) => (event) => {
    event.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

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
              component="a"
              href="#top"
              onClick={handleNavClick('#top')}
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
                src={`${import.meta.env.BASE_URL}logos/oldGoat.svg`}
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
                <Button
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  sx={{
                    color: 'rgba(255,255,255,0.88)',
                    px: 1.75,
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      color: '#fff',
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                href="https://ogtc.net/index.html"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                endIcon={<NorthEastIcon sx={{ fontSize: 14 }} />}
                sx={{
                  ml: 1,
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Visit OGTC
              </Button>
            </Box>

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
          onClose={() => setOpen(false)}
          slotProps={{
            paper: {
              sx: { bgcolor: colors.navyDarker, width: 280 },
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
            <IconButton onClick={() => setOpen(false)} sx={{ color: '#fff' }} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton onClick={handleNavClick(link.href)}>
                  <ListItemText
                    primary={link.label}
                    slotProps={{
                      primary: {
                        sx: { color: '#fff', fontWeight: 700, fontSize: '1.1rem' },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 1 }}>
              <ListItemButton
                component="a"
                href="https://ogtc.net/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText
                  primary="Visit OGTC ↗"
                  slotProps={{
                    primary: {
                      sx: { color: colors.gold, fontWeight: 700, fontSize: '1.1rem' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  )
}
