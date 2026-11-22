'use client'

import Link from 'next/link'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { colors } from '../../theme'

/** The Group Owner's way into the Edit Group form, shown in the Group page's hero. */
export default function EditGroupButton({ groupId }: { groupId: string }) {
  return (
    <Button
      component={Link}
      href={`/groups/${groupId}/edit`}
      variant="contained"
      startIcon={<EditIcon />}
      sx={{
        flexShrink: 0,
        minHeight: 48,
        bgcolor: '#fff',
        color: colors.navy,
        '&:hover': { bgcolor: colors.bone },
      }}
    >
      Edit Group
    </Button>
  )
}
