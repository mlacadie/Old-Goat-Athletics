'use client'

import Link from 'next/link'
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { colors } from '../../theme'
import { DEFAULT_GROUP_IMAGE, editGroupPath, groupPath } from '../../data/groups'
import type { GroupListing } from '../../types/group'
import JoinButton, { type JoinStatus } from './JoinButton'
import MemberChip from './MemberChip'
import YourGroupChip from './YourGroupChip'

const actionButtonSx = { flex: 1, px: 2 }

/**
 * One Group's tile on the Groups page. The viewer's own Groups are marked and get Edit Group
 * instead of Join; Groups they joined are marked Member and get Leave.
 */
export default function GroupCard({ group, signedIn }: { group: GroupListing; signedIn: boolean }) {
  const location = [group.city, group.state].filter(Boolean).join(', ')
  let joinStatus: JoinStatus = 'visitor'
  if (group.isMember) joinStatus = 'member'
  else if (signedIn) joinStatus = 'user'

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
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip
            label={group.sport}
            size="small"
            sx={{ bgcolor: 'rgba(0,50,100,0.1)', color: colors.navy, fontWeight: 700 }}
          />
          {group.isOwner && <YourGroupChip tone="light" />}
          {group.isMember && <MemberChip tone="light" />}
        </Stack>
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
            component={Link}
            href={groupPath(group.id)}
            variant="outlined"
            sx={{ ...actionButtonSx, color: colors.navy, borderColor: colors.navy }}
          >
            View Group
          </Button>
          {group.isOwner ? (
            <Button component={Link} href={editGroupPath(group.id)} variant="contained" sx={actionButtonSx}>
              Edit Group
            </Button>
          ) : (
            <JoinButton groupId={group.id} status={joinStatus} tone="card" />
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}
