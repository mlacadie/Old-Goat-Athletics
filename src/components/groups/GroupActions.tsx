'use client'

import Link from 'next/link'
import { Button, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { editGroupPath } from '../../data/groups'
import type { GroupRole } from '../../lib/viewer'
import JoinButton from './JoinButton'
import YourGroupChip from './YourGroupChip'
import { heroButtonSx } from './styles'

/**
 * What the Group page's hero offers the viewer: Your Group and Edit Group for the Owner, a Member
 * badge and Leave for Members, Join for everyone else (Visitors sign in first).
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
  return <JoinButton groupId={groupId} status={role} tone="hero" />
}
