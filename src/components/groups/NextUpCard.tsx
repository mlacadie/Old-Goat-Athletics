import { Box, Stack, Typography } from '@mui/material'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import { colors } from '../../theme'
import { sectionLabelSx } from './styles'

/**
 * The navy card at the top of the members-only area that will show the Group's next Event (date,
 * title, time, place, notes). Until Events & Calendar is built it shows the empty state.
 */
export default function NextUpCard() {
  return (
    <Box
      component="section"
      aria-labelledby="next-up-heading"
      sx={{
        bgcolor: colors.navy,
        color: '#fff',
        borderRadius: '18px',
        p: { xs: 3, md: 3.5 },
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 96,
          height: 104,
          flexShrink: 0,
          borderRadius: '14px',
          bgcolor: '#fff',
          color: colors.navy,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EventOutlinedIcon sx={{ fontSize: 44 }} />
      </Box>
      <Stack spacing={0.75} sx={{ flex: '1 1 260px', minWidth: 0 }}>
        <Typography
          id="next-up-heading"
          component="h2"
          sx={{ ...sectionLabelSx, m: 0, color: colors.goldLight }}
        >
          Next up
        </Typography>
        <Typography variant="h3" component="p" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, lineHeight: 1 }}>
          No upcoming Events yet
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.55 }}>
          When the Group posts a workout, race, or social, it shows up here and on the Calendar.
        </Typography>
      </Stack>
    </Box>
  )
}
