import Link from 'next/link'
import { Box, Container, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { colors } from '../../theme'
import type { Group } from '../../types/group'
import type { GroupRole } from '../../lib/viewer'
import { DEFAULT_GROUP_IMAGE } from '../../data/groups'
import GroupActions from './GroupActions'

const backLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  minHeight: 44,
  color: 'rgba(255,255,255,0.85)',
  fontWeight: 600,
  fontSize: '0.92rem',
  textDecoration: 'none',
}


/** The top of a Group page: Group banner (or the branded fallback), sport and location, name, and Join. */
export default function GroupHero({ group, role }: { group: Group; role: GroupRole }) {
  const kicker = [group.sport, [group.city, group.state].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(' · ')

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: colors.navyDarker,
        color: '#fff',
        ...(group.banner && {
          backgroundImage: `linear-gradient(rgba(0,20,42,0.55), rgba(0,20,42,0.85)), url(${group.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
      }}
    >
      {!group.banner && (
        <Box
          component="img"
          src={DEFAULT_GROUP_IMAGE}
          alt=""
          sx={{
            position: 'absolute',
            right: { xs: -48, md: '6%' },
            bottom: { xs: -24, md: 32 },
            height: { xs: 180, md: 240 },
            width: 'auto',
            filter: 'brightness(0) invert(1)',
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        />
      )}
      <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 5 } }}>
        <Link href="/groups" style={backLinkStyle}>
          <ArrowBackIcon fontSize="small" />
          All Groups
        </Link>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 2.5 }}
          sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' }, mt: { xs: 4, md: 6 } }}
        >
          <Stack spacing={1} sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              sx={{
                color: colors.goldLight,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontSize: '0.78rem',
              }}
            >
              {kicker}
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: '2.6rem', sm: '3.2rem', md: '3.8rem' }, lineHeight: 0.95, overflowWrap: 'anywhere' }}
            >
              {group.name}
            </Typography>
          </Stack>
          <GroupActions groupId={group.id} role={role} />
        </Stack>
      </Container>
    </Box>
  )
}
