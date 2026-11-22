import { Box, Stack } from '@mui/material'
import type { DateKey } from '../../lib/calendar'
import type { GroupRole } from '../../lib/viewer'
import type { MembersOnlyContent } from '../../types/group'
import GroupAnnouncements from './GroupAnnouncements'
import GroupCalendar from './GroupCalendar'
import JoinPrompt from './JoinPrompt'
import MembersCard from './MembersCard'
import NextUpCard from './NextUpCard'

interface Props {
  groupId: string
  groupName: string
  role: GroupRole
  /** Null for non-members: the server never loads members-only content for them. */
  content: MembersOnlyContent | null
  today: DateKey
}

/**
 * The members-only part of the Group page, below the About row (design G). Members and the Owner
 * get Next up, Latest Announcements, the Calendar, and the Members list. Everyone else gets the
 * join prompt in place of Next up and locked, grayed-out versions of the rest.
 */
export default function MembersOnlySection({ groupId, groupName, role, content, today }: Props) {
  const locked = content === null

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: { md: 'flex-start' }, mt: { xs: 4, md: 5 } }}>
      <Stack spacing={3} sx={{ flex: { md: '2 1 520px' }, minWidth: 0 }}>
        {locked ? (
          <JoinPrompt groupId={groupId} status={role === 'visitor' ? 'visitor' : 'user'} />
        ) : (
          <NextUpCard />
        )}
        <GroupAnnouncements locked={locked} />
      </Stack>
      <Box sx={{ flex: { md: '1 1 340px' }, minWidth: 0 }}>
        <Stack spacing={3}>
          <GroupCalendar serverToday={today} locked={locked} />
          <MembersCard groupName={groupName} members={content?.members ?? null} />
        </Stack>
      </Box>
    </Stack>
  )
}
