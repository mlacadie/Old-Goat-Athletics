import { Box, Container, Typography, Button, Stack } from '@mui/material'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { colors } from '../theme.js'

export default function Hero() {
  const scrollTo = (href) => (event) => {
    event.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: `radial-gradient(ellipse 90% 60% at 50% -10%, ${colors.navy} 0%, ${colors.navyDark} 55%, ${colors.navyDarker} 100%)`,
        color: '#fff',
      }}
    >
      <Box
        component="img"
        src="/logos/OGTC_Old_Goat.svg"
        alt=""
        aria-hidden="true"
        sx={{
          position: 'absolute',
          right: { xs: '-4%', md: '2%' },
          top: '50%',
          transform: 'translateY(-50%)',
          width: { xs: '95%', md: '58%' },
          maxWidth: 760,
          opacity: 0.12,
          filter: 'brightness(0) invert(1)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 16, md: 12 } }}>
        <Stack spacing={3} sx={{ maxWidth: 780 }}>
          <Typography
            sx={{
              color: colors.gold,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: { xs: '0.75rem', md: '0.85rem' },
            }}
          >
            A Community for Former College Athletes
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3.4rem', sm: '4.5rem', md: '6rem' },
              color: '#fff',
            }}
          >
            Keep
            <Box component="span" sx={{ color: colors.gold, display: 'block' }}>
              Competing.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            You put in the years. The early mornings, the film sessions, the locker room.
            Graduation doesn&rsquo;t end the competitor in you &mdash; it just means it&rsquo;s
            time to find what&rsquo;s next.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              size="large"
              variant="contained"
              onClick={scrollTo('#track-club')}
              sx={{
                bgcolor: colors.gold,
                color: colors.navyDarker,
                fontSize: '1rem',
                '&:hover': { bgcolor: '#e0b04f' },
              }}
            >
              Meet the Track Club
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={scrollTo('#socials')}
              endIcon={<NorthEastIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.45)',
                fontSize: '1rem',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Follow the Herd
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box
        onClick={scrollTo('#mission')}
        role="button"
        aria-label="Scroll to mission"
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'bob 2.2s ease-in-out infinite',
          '@keyframes bob': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(8px)' },
          },
        }}
      >
        <KeyboardArrowDownIcon />
      </Box>
    </Box>
  )
}
