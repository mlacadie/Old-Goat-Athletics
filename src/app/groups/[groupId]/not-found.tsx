'use client'

import Link from 'next/link'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { colors } from '../../../theme'

export default function GroupNotFound() {
  return (
    <Box component="section" sx={{ bgcolor: colors.bone, py: { xs: 14, md: 18 } }}>
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
            Group not found
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, color: colors.navyDarker }}
          >
            This crew moved on.
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, fontSize: '1.05rem' }}>
            We couldn&rsquo;t find that Group. It may have been renamed or removed.
          </Typography>
          <Button
            component={Link}
            href="/groups"
            variant="contained"
            sx={{ mt: 2, bgcolor: colors.navy, '&:hover': { bgcolor: colors.navyDark } }}
          >
            Browse Groups
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
