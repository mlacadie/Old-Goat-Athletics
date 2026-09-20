import { Box, Container, Typography, Stack, Chip } from '@mui/material'
import { colors } from '../theme.js'

export default function Merch() {
  return (
    <Box
      id="merch"
      component="section"
      sx={{
        bgcolor: colors.navyDarker,
        color: '#fff',
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}logos/OG_Horns.svg`}
        alt=""
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '140%',
          maxWidth: 900,
          transform: 'translate(-50%, -50%)',
          opacity: 0.04,
          filter: 'brightness(0) invert(1)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography
            sx={{
              color: colors.gold,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            Gear Up
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.6rem' },
              lineHeight: 1.05,
            }}
          >
            Merch is
            <Box component="span" sx={{ color: colors.gold, display: 'block' }}>
              coming soon.
            </Box>
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.75,
              maxWidth: 620,
            }}
          >
            We&rsquo;re putting together gear worthy of the herd. Shirts, hats, and more &mdash;
            built for goats who still show up. Check back soon.
          </Typography>

          <Chip
            label="In the works"
            sx={{
              mt: 3,
              bgcolor: 'transparent',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: 700,
              px: 1,
            }}
          />
        </Stack>
      </Container>
    </Box>
  )
}
