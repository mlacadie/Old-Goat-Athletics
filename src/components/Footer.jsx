import { Box, Container, Grid, Typography, Stack, IconButton, Divider } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import TikTokIcon from '../icons/TikTokIcon.jsx'
import { colors } from '../theme.js'

const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'I ___ Now', href: '#i-now' },
  { label: 'Merch', href: '#merch' },
  { label: 'Track Club', href: '#track-club' },
  { label: 'Socials', href: '#socials' },
]

const SOCIAL_ICONS = [
  { name: 'instagram', Icon: InstagramIcon },
  { name: 'tiktok', Icon: TikTokIcon },
  { name: 'facebook', Icon: FacebookIcon },
  { name: 'x', Icon: XIcon },
]

export default function Footer() {
  const scrollTo = (href) => (event) => {
    event.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box component="footer" sx={{ bgcolor: colors.navyDarker, color: '#fff', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ justifyContent: 'space-between' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.2, mb: 2 }}>
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}logos/oldGoat.svg`}
                alt=""
                sx={{ width: 55, height: 'auto', filter: 'brightness(0) invert(1)' }}
              />
              <Box
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '2rem',
                  letterSpacing: '0.04em',
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                OLD GOAT
                <br />
                ATHLETICS
              </Box>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 360, lineHeight: 1.7 }}>
              A community for former college athletes to keep competing, find a new sport,
              and stay active for life.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2, letterSpacing: '0.05em' }}>
              Explore
            </Typography>
            <Stack spacing={1.2}>
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={scrollTo(link.href)}
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': { color: colors.gold },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 2, letterSpacing: '0.05em' }}>
              Community
            </Typography>
            <Stack spacing={1.2}>
              <Typography
                component="a"
                href="https://ogtc.net/index.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  '&:hover': { color: colors.gold },
                }}
              >
                Old Goat Track Club ↗
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {SOCIAL_ICONS.map(({ name, Icon }) => (
                <IconButton
                  key={name}
                  size="small"
                  aria-label="Social link coming soon"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': { color: colors.gold, borderColor: colors.gold },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 5 }} />

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.85rem',
            textAlign: 'center',
          }}
        >
          {new Date().getFullYear()} Old Goat Athletics. Keep competing.
        </Typography>
      </Container>
    </Box>
  )
}
