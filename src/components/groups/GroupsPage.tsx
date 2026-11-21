'use client'

import { useMemo, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  InputAdornment,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { colors } from '../../theme'
import { GROUPS } from '../../data/groups'
import type { Group } from '../../types/group'
import GroupCard from './GroupCard'
import SportPills from './SportPills'

const ALL = 'All'

const SPORTS = [ALL, ...new Set(GROUPS.map((group) => group.sport).filter(Boolean))]
const STATES = [ALL, ...new Set(GROUPS.map((group) => group.state).filter(Boolean))]

function matchesSearch(group: Group, query: string) {
  if (!query) return true
  const haystack = [group.name, group.sport, group.city, group.state, ...group.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

export default function GroupsPage() {
  const [sport, setSport] = useState(ALL)
  const [state, setState] = useState(ALL)
  const [search, setSearch] = useState('')

  const query = search.trim().toLowerCase()

  const filtered = useMemo(
    () =>
      GROUPS.filter(
        (group) =>
          (sport === ALL || group.sport === sport) &&
          (state === ALL || group.state === state) &&
          matchesSearch(group, query)
      ),
    [sport, state, query]
  )

  const hasActiveFilters = sport !== ALL || state !== ALL || query !== ''

  const clearFilters = () => {
    setSport(ALL)
    setState(ALL)
    setSearch('')
  }

  return (
    <Box component="section" sx={{ bgcolor: colors.bone, py: { xs: 14, md: 18 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: 4.5 }}
        >
          <Stack spacing={1.25} sx={{ flexGrow: 1 }}>
            <Typography
              sx={{
                color: colors.navy,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
              }}
            >
              Find Your Crew
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: '2.6rem', md: '3.2rem' }, color: colors.navyDarker }}
            >
              Groups
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 520, fontSize: '1.05rem' }}>
              Clubs, teams, and crews for Old Goats such as yourself. Find one near you, or add your own.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ flexShrink: 0, bgcolor: colors.navy, '&:hover': { bgcolor: colors.navyDark } }}
          >
            Add your Group
          </Button>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{ alignItems: { xs: 'stretch', sm: 'center' }, mb: 1.5 }}
        >
          <TextField
            type="search"
            size="small"
            placeholder="Search by name, city, sport, or tag"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              htmlInput: { 'aria-label': 'Search Groups' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flexGrow: 1,
              '& .MuiOutlinedInput-root': { bgcolor: '#fff', borderRadius: 999, minHeight: 46, pl: 1 },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="state-filter-label">State</InputLabel>
            <Select
              labelId="state-filter-label"
              label="State"
              value={state}
              onChange={(event) => setState(event.target.value)}
              sx={{ bgcolor: '#fff', minHeight: 46 }}
            >
              {STATES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <SportPills sports={SPORTS} value={sport} onChange={setSport} />

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 3.5, minHeight: 44 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            Showing {filtered.length} of {GROUPS.length} Groups
          </Typography>
          {hasActiveFilters && (
            <Button onClick={clearFilters} sx={{ color: colors.navy, fontWeight: 700, px: 1.5 }}>
              Clear filters
            </Button>
          )}
        </Stack>

        {filtered.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3.5,
              border: `1px solid ${colors.grayLight}`,
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>
              No Groups match those filters yet
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2.5 }}>
              Run one that should be here? Add it so other former athletes can find it and join.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ bgcolor: colors.navy, '&:hover': { bgcolor: colors.navyDark } }}
            >
              Add your Group
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((group) => (
              <Grid key={group.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <GroupCard group={group} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
