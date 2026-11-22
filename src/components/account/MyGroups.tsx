'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { groupPath } from '../../data/groups'
import type { MyGroup } from '../../types/group'
import MemberChip from '../groups/MemberChip'
import YourGroupChip from '../groups/YourGroupChip'

type Filter = 'all' | 'owned' | 'joined'

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'You haven’t joined or added any Groups yet.',
  owned: 'You haven’t added a Group yet.',
  joined: 'You haven’t joined any Groups yet.',
}

function matchesFilter(group: MyGroup, filter: Filter): boolean {
  if (filter === 'owned') return group.isOwner
  if (filter === 'joined') return !group.isOwner
  return true
}

/** The My Groups tab on the profile: the Groups a User owns or has joined, filterable by which. */
export default function MyGroups({ groups }: { groups: MyGroup[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = groups.filter((group) => matchesFilter(group, filter))

  return (
    <Box>
      <Typography variant="h6" component="h1" sx={{ mb: 0.5 }}>
        My Groups
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>The Groups you own and the ones you&rsquo;ve joined.</Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={filter}
        onChange={(_event, value: Filter | null) => {
          if (value) setFilter(value)
        }}
        aria-label="Show Groups"
        sx={{ mb: 1.5 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="owned">Owned</ToggleButton>
        <ToggleButton value="joined">Joined</ToggleButton>
      </ToggleButtonGroup>
      {shown.length === 0 ? (
        <Box sx={{ py: 2 }}>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{EMPTY_MESSAGES[filter]}</Typography>
          <Button component={Link} href="/groups" variant="contained">
            Browse Groups
          </Button>
        </Box>
      ) : (
        <List disablePadding>
          {shown.map((group) => (
            <ListItemButton key={group.id} component={Link} href={groupPath(group.id)} sx={{ borderRadius: 2, gap: 2 }}>
              <ListItemText
                primary={group.name}
                secondary={[group.sport, group.location].filter(Boolean).join(' · ')}
                slotProps={{ primary: { sx: { fontWeight: 700 } } }}
              />
              {group.isOwner ? <YourGroupChip tone="light" /> : <MemberChip tone="light" />}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  )
}
