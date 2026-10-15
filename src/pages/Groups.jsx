import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { colors } from '../theme.js'
import clubs from '../data/clubs.json'

const ALL = 'All'

export default function Groups() {
  const [sport, setSport] = useState(ALL)
  const [state, setState] = useState(ALL)

  const sports = useMemo(
    () => [ALL, ...new Set(clubs.map((club) => club.sport).filter(Boolean))],
    []
  )
  const states = useMemo(
    () => [ALL, ...new Set(clubs.map((club) => club.state).filter(Boolean))],
    []
  )

  const filtered = useMemo(
    () =>
      clubs.filter(
        (club) => (sport === ALL || club.sport === sport) && (state === ALL || club.state === state)
      ),
    [sport, state]
  )

  const hasActiveFilters = sport !== ALL || state !== ALL

  return (
    <Box component="section" sx={{ bgcolor: colors.bone, py: { xs: 14, md: 18 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
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
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, color: colors.navyDarker }}
          >
            Groups &amp; Clubs
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, fontSize: '1.05rem' }}>
            A directory of clubs for former college athletes staying competitive in whatever
            sport is their &ldquo;I ___ now.&rdquo; Starting with one, growing from here.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'stretch', md: 'center' }, mb: 1.5 }}
        >
          <ToggleButtonGroup
            value={sport}
            exclusive
            onChange={(_event, value) => value && setSport(value)}
            size="small"
            sx={{
              flexWrap: 'wrap',
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 999,
                border: `1px solid ${colors.grayLight}`,
                mx: 0.4,
                '&.Mui-selected': {
                  bgcolor: colors.navy,
                  color: '#fff',
                  '&:hover': { bgcolor: colors.navyDark },
                },
              },
            }}
          >
            {sports.map((option) => (
              <ToggleButton key={option} value={option}>
                {option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <FormControl size="small" sx={{ minWidth: 160, ml: { md: 'auto' } }}>
            <InputLabel id="state-filter-label">State</InputLabel>
            <Select
              labelId="state-filter-label"
              label="State"
              value={state}
              onChange={(event) => setState(event.target.value)}
            >
              {states.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            disabled={!hasActiveFilters}
            onClick={() => {
              setSport(ALL)
              setState(ALL)
            }}
            sx={{ color: colors.navy, fontWeight: 600 }}
          >
            Clear filters
          </Button>
        </Stack>

        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 4 }}>
          Showing {filtered.length} of {clubs.length} clubs
        </Typography>

        {filtered.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              border: `1px solid ${colors.grayLight}`,
            }}
          >
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem' }}>
              No clubs match those filters yet &mdash; know one that should be here?
            </Typography>
            <Button component={RouterLink} to="/contact" sx={{ mt: 2, color: colors.navy, fontWeight: 700 }}>
              Let us know &rarr;
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((club) => (
              <Grid key={club.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3.5,
                    borderRadius: 3,
                    border: `1px solid ${colors.grayLight}`,
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
                  <Chip
                    label={club.sport}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                      bgcolor: 'rgba(0,50,100,0.1)',
                      color: colors.navy,
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  />
                  <Typography variant="h5" sx={{ color: colors.navyDarker, mb: 0.5 }}>
                    {club.name}
                  </Typography>
                  {(club.city || club.state) && (
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary', mb: 1.5 }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography sx={{ fontSize: '0.9rem' }}>
                        {[club.city, club.state].filter(Boolean).join(', ')}
                      </Typography>
                    </Stack>
                  )}
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.7, mb: 3, flexGrow: 1 }}>
                    {club.description}
                  </Typography>
                  <Button
                    variant="contained"
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<NorthEastIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      alignSelf: 'flex-start',
                      bgcolor: colors.navy,
                      '&:hover': { bgcolor: colors.navyDark },
                    }}
                  >
                    Visit Site
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Stack sx={{ alignItems: 'center', mt: 7 }}>
          <Typography sx={{ color: 'text.secondary', mb: 1 }}>
            Know a club that should be here?
          </Typography>
          <Button component={RouterLink} to="/contact" variant="outlined" sx={{ color: colors.navy, borderColor: colors.navy }}>
            Tell us about it
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
