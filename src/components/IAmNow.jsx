import { useEffect, useState } from 'react'
import { Box, Container, Typography, Chip, Stack } from '@mui/material'
import { colors } from '../theme.js'


const WORDS = [
  'RUN',
  'GOLF',
  'LIFT',
  'HIKE',
  'SWIM',
  'RIDE',
  'COACH',
  'ROW',
  'CLIMB',
  'SURF',
  'TRI',
  'HOOP',
  'LEARN',
  'YOGA',
  'DANCE',
  'PLAY',
]

export default function IAmNow() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => setVisible(false), 1800)
    return () => clearInterval(cycle)
  }, [])

  useEffect(() => {
    if (visible) return
    const swap = setTimeout(() => {
      setIndex((prev) => (prev + 1) % WORDS.length)
      setVisible(true)
    }, 250)
    return () => clearTimeout(swap)
  }, [visible])

  return (
    <Box
      id="i-now"
      component="section"
      sx={{ bgcolor: 'background.paper', py: { xs: 10, md: 14 } }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography
            sx={{
              color: colors.navy,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            Your New Game
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: { xs: 1.5, md: 2.5 },
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: { xs: '3.2rem', sm: '4.5rem', md: '6rem' },
              lineHeight: 1,
              color: colors.navyDarker,
            }}
          >
            <span>I</span>
            <Box
              component="span"
              sx={{
                color: colors.gold,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                minWidth: { xs: '5ch', md: '6ch' },
                display: 'inline-block',
              }}
            >
              {WORDS[index]}
            </Box>
            <span>Now.</span>
          </Box>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            For years, your sport was your identity. Then the eligibility ran out and the
            jersey went in a box. Old Goat Athletics is the community for filling in that
            blank &mdash; helping former college athletes find the next sport, hobby, or
            competitive outlet that makes them feel like themselves again.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
