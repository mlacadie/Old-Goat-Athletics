import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import { colors } from '../theme.js'

const STATS = [
  { value: '4', label: 'Years of eligibility used' },
  { value: '1', label: 'Identity crisis, survived' },
  { value: '∞', label: 'Competitions left to win' },
]

export default function Washed() {
  return (
    <Box
      id="washed"
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
        src="/logos/OG_Horns.svg"
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
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography
            sx={{
              color: colors.gold,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            Yeah, We Said It
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.6rem' },
              lineHeight: 1.05,
            }}
          >
            They call it &ldquo;washed.&rdquo;
            <Box component="span" sx={{ color: colors.gold, display: 'block' }}>
              We call it Tuesday.
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
            No, you can&rsquo;t run a 4.4 forty anymore. Your knees know it, your PR from 2016
            knows it. Being &ldquo;washed&rdquo; isn&rsquo;t an insult here &mdash; it&rsquo;s
            a rite of passage. Every Old Goat has been there. The difference is what you do
            next.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4, width: '100%' }} justifyContent="center">
            {STATS.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 3,
                    py: 4,
                    px: 2,
                    height: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '3rem',
                      color: colors.gold,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      mt: 1,
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}
