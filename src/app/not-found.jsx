'use client'

import Link from 'next/link'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { colors } from '../theme.js'

export default function NotFound() {
  return (
    <Box component="section" sx={{ bgcolor: colors.bone, py: { xs: 14, md: 18 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography
            sx={{
              color: colors.navy,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            404
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, color: colors.navyDarker }}
          >
            Off course.
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, fontSize: '1.05rem' }}>
            We couldn&rsquo;t find that page.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            sx={{ mt: 2, bgcolor: colors.navy, '&:hover': { bgcolor: colors.navyDark } }}
          >
            Back to home
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
