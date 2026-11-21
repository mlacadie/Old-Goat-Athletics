import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { colors } from '../../theme'
import type { Group } from '../../types/group'

/** Shown when a Group has no Group image of its own. */
export const DEFAULT_GROUP_IMAGE = '/logos/OGTC_OGoatG_KC.svg'

export default function GroupCard({ group }: { group: Group }) {
  const location = [group.city, group.state].filter(Boolean).join(', ')

  return (
    <Paper
      component="article"
      elevation={0}
      sx={{
        borderRadius: 3.5,
        border: `1px solid ${colors.grayLight}`,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 32px rgba(0,50,100,0.1)',
        },
      }}
    >
      <Box
        sx={{
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#eef1f5',
          borderBottom: `1px solid ${colors.grayLight}`,
        }}
      >
        {group.image ? (
          <Box
            component="img"
            src={group.image}
            alt=""
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            component="img"
            src={DEFAULT_GROUP_IMAGE}
            alt=""
            sx={{ height: 120, width: 'auto', objectFit: 'contain' }}
          />
        )}
      </Box>

      <Stack spacing={1} sx={{ p: 3, pt: 2.75, flexGrow: 1 }}>
        <Chip
          label={group.sport}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            bgcolor: 'rgba(0,50,100,0.1)',
            color: colors.navy,
            fontWeight: 700,
          }}
        />
        <Typography variant="h5" component="h2" sx={{ color: colors.navyDarker, fontSize: '1.25rem' }}>
          {group.name}
        </Typography>
        {location && (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
            <LocationOnIcon fontSize="small" />
            <Typography sx={{ fontSize: '0.9rem' }}>{location}</Typography>
          </Stack>
        )}
        <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.65, flexGrow: 1 }}>
          {group.description}
        </Typography>
        <Stack direction="row" spacing={1.25} sx={{ pt: 1.5 }}>
          <Button
            variant="outlined"
            sx={{ flex: 1, color: colors.navy, borderColor: colors.navy, px: 2 }}
          >
            View Group
          </Button>
          <Button
            variant="contained"
            sx={{ flex: 1, bgcolor: colors.navy, px: 2, '&:hover': { bgcolor: colors.navyDark } }}
          >
            Join
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
