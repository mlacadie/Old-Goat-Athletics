'use client'

import { useState } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { colors } from '../../theme'
import type { GroupMember } from '../../types/group'
import LockedNote from './LockedNote'
import { panelHeadingSx, panelSx } from './styles'

/** How many avatars the card shows before See all. */
const PREVIEW_COUNT = 12
/** Gray circles non-members see. Always the same number, so it says nothing about the real list. */
const LOCKED_AVATARS = ['a', 'b', 'c', 'd', 'e', 'f']

/** Avatar colors, taken in turn so neighbors differ. Each pair passes 4.5:1 contrast. */
const AVATAR_COLORS = [
  { bgcolor: colors.navy, color: '#fff' },
  { bgcolor: colors.gold, color: colors.navyDarker },
  { bgcolor: '#dfe6ee', color: colors.navy },
  { bgcolor: '#f6ecd6', color: '#6b4d0c' },
] as const

function MemberAvatar({ member, index }: { member: GroupMember; index: number }) {
  return (
    <Avatar
      aria-hidden="true"
      sx={{ ...AVATAR_COLORS[index % AVATAR_COLORS.length], width: 40, height: 40, fontSize: '0.82rem', fontWeight: 700 }}
    >
      {member.initials}
    </Avatar>
  )
}

/** "Owner", "You", both, or nothing, under a name in the full Members list. */
function memberNote(member: GroupMember) {
  return [member.isOwner && 'Owner', member.isViewer && 'You'].filter(Boolean).join(' · ') || undefined
}

/**
 * The Members card on the Group page. Members see the first avatars and See all, which opens the
 * whole list of display names. Non-members (`members` is null) see gray placeholders and a lock note.
 */
export default function MembersCard({ groupName, members }: { groupName: string; members: GroupMember[] | null }) {
  const [open, setOpen] = useState(false)

  return (
    <Stack component="section" aria-labelledby="members-heading" spacing={1.5} sx={panelSx}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minHeight: 44 }}>
        <Typography id="members-heading" component="h2" sx={{ ...panelHeadingSx, flexGrow: 1 }}>
          Members
        </Typography>
        {members && members.length > 0 && (
          <Button onClick={() => setOpen(true)} sx={{ minHeight: 44, px: 1.5 }}>
            See all
          </Button>
        )}
      </Stack>

      {members === null && (
        <>
          <Stack direction="row" useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }} aria-hidden="true">
            {LOCKED_AVATARS.map((id) => (
              <Skeleton key={id} animation={false} variant="circular" width={40} height={40} />
            ))}
          </Stack>
          <LockedNote>Join to see who&rsquo;s in the Group</LockedNote>
        </>
      )}

      {members?.length === 0 && (
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>No one has joined yet.</Typography>
      )}

      {members && members.length > 0 && (
        <Stack component="ul" direction="row" useFlexGap spacing={1} sx={{ flexWrap: 'wrap', listStyle: 'none', m: 0, p: 0 }}>
          {members.slice(0, PREVIEW_COUNT).map((member, index) => (
            <li key={member.key} title={member.name}>
              <MemberAvatar member={member} index={index} />
              <Typography component="span" sx={visuallyHiddenSx}>
                {member.name}
              </Typography>
            </li>
          ))}
        </Stack>
      )}

      {members && (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs" aria-labelledby="members-dialog-title">
          <DialogTitle id="members-dialog-title" sx={{ pr: 7 }}>
            Members of {groupName}
          </DialogTitle>
          <IconButton
            aria-label="Close"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, width: 44, height: 44 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ p: 0 }}>
            <List>
              {members.map((member, index) => (
                <ListItem key={member.key}>
                  <ListItemAvatar>
                    <MemberAvatar member={member} index={index} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} secondary={memberNote(member)} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      )}
    </Stack>
  )
}

/** Read by screen readers, not shown: the name behind each avatar's initials. */
const visuallyHiddenSx = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const
