'use client'

import Link from 'next/link'
import { Button, Chip, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { editGroupPath } from '../../data/groups'
import type { GroupRole } from '../../lib/viewer'
import YourGroupChip from './YourGroupChip'
import { heroButtonSx, heroChipSx } from './styles'

/**
 * What the Group page's hero offers the viewer: Your Group and Edit Group for the Owner, a Member
 * badge for Members, Join for everyone else.
 *
 * A client component on purpose: MUI's Chip only draws an `icon` it can see as a React element, and
 * an icon passed down from a server component arrives as a lazy reference, so the Chip drops it.
 */
export default function GroupActions({ groupId, role }: { groupId: string; role: GroupRole }) {
  if (role === 'owner') {
    return (
      <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0, alignItems: 'center' }}>
        <YourGroupChip tone="dark" />
        <Button
          component={Link}
          href={editGroupPath(groupId)}
          variant="contained"
          startIcon={<EditIcon />}
          sx={heroButtonSx}
        >
          Edit Group
        </Button>
      </Stack>
    )
  }
  if (role === 'member') return <Chip icon={<CheckIcon />} label="Member" sx={heroChipSx} />
  // Joining: wire this up. Visitors are asked to sign in first.
  return (
    <Button variant="contained" sx={heroButtonSx}>
      Join Group
    </Button>
  )
}
