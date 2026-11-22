import { Box, Skeleton, Stack, Typography } from '@mui/material'
import LockedNote from './LockedNote'
import { panelSx } from './styles'

/** A smaller `panelSx` card, for one Announcement or the empty state. */
const cardSx = { ...panelSx, borderRadius: '14px', py: 2.25 } as const

/** Placeholder bars for one Announcement. Always the same, so they say nothing about the real ones. */
function AnnouncementSkeleton({ titleWidth }: { titleWidth: string }) {
  return (
    <Stack direction="row" useFlexGap spacing={2} sx={{ ...cardSx, flexWrap: 'wrap' }}>
      <Skeleton animation={false} variant="text" width={48} sx={{ fontSize: '0.85rem' }} />
      <Box sx={{ flex: '1 1 280px' }}>
        <Skeleton animation={false} variant="text" width={titleWidth} sx={{ fontSize: '1.05rem' }} />
        <Skeleton animation={false} variant="text" width="100%" />
        <Skeleton animation={false} variant="text" width="80%" />
      </Box>
    </Stack>
  )
}

/**
 * Latest Announcements on the Group page. Members see the Group's Announcements (an empty state
 * until Announcements is built); non-members see grayed-out placeholders and a lock note.
 */
export default function GroupAnnouncements({ locked }: { locked: boolean }) {
  return (
    <Stack component="section" aria-labelledby="announcements-heading" spacing={1.25}>
      <Typography id="announcements-heading" component="h2" sx={{ m: 0, fontSize: '1.25rem', fontWeight: 700 }}>
        Latest Announcements
      </Typography>
      {locked ? (
        <>
          <Stack spacing={1.25} aria-hidden="true">
            <AnnouncementSkeleton titleWidth="55%" />
            <AnnouncementSkeleton titleWidth="40%" />
          </Stack>
          <LockedNote>Announcements show here for Members</LockedNote>
        </>
      ) : (
        <Box sx={cardSx}>
          <Typography sx={{ fontWeight: 700 }}>No Announcements yet</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6, mt: 0.5 }}>
            News, updates, and reminders from the Group show up here.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}
