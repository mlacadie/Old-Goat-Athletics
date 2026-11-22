'use client'

import { useId, useState, useSyncExternalStore } from 'react'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { colors } from '../../theme'
import { formatMonth, monthStart, monthWeeks, todayKey, type DateKey } from '../../lib/calendar'
import LockedNote from './LockedNote'
import { panelHeadingSx, panelSx } from './styles'

const WEEKDAYS = [
  { letter: 'S', name: 'Sunday' },
  { letter: 'M', name: 'Monday' },
  { letter: 'T', name: 'Tuesday' },
  { letter: 'W', name: 'Wednesday' },
  { letter: 'T', name: 'Thursday' },
  { letter: 'F', name: 'Friday' },
  { letter: 'S', name: 'Saturday' },
]


// Today never needs to update while the page is open, so there's nothing to subscribe to.
const subscribeToNothing = () => () => {}

const navButtonSx = {
  width: 44,
  height: 44,
  border: `1px solid ${colors.grayLight}`,
  color: colors.navy,
} as const

/**
 * The month Calendar on the Group page, today outlined. Members can step through months; for
 * non-members it is locked to this month with a note that Events show here for Members.
 *
 * `serverToday` is today on the server, used for the first render so it matches the HTML; the
 * browser then switches to the viewer's own today, which differs near midnight or across time zones.
 * Events (dots on their days, and the list under the grid) come with Events & Calendar.
 */
export default function GroupCalendar({ serverToday, locked }: { serverToday: DateKey; locked: boolean }) {
  const today = useSyncExternalStore(subscribeToNothing, todayKey, () => serverToday)
  const [monthOffset, setMonthOffset] = useState(0)
  const headingId = useId()
  const start = monthStart(today, monthOffset)
  const weeks = monthWeeks(start)

  return (
    <Stack component="section" aria-labelledby={headingId} spacing={1.5} sx={panelSx}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography id={headingId} component="h2" aria-live="polite" sx={{ ...panelHeadingSx, flexGrow: 1 }}>
          {formatMonth(start)}
        </Typography>
        <IconButton
          aria-label="Previous month"
          disabled={locked}
          onClick={() => setMonthOffset((offset) => offset - 1)}
          sx={navButtonSx}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="Next month"
          disabled={locked}
          onClick={() => setMonthOffset((offset) => offset + 1)}
          sx={navButtonSx}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Box
        component="table"
        aria-labelledby={headingId}
        sx={{
          // The 4px spacing also runs around the outside, so pull the edges back in line with the card.
          width: 'calc(100% + 8px)',
          tableLayout: 'fixed',
          borderCollapse: 'separate',
          borderSpacing: '4px',
          mx: '-4px',
          textAlign: 'center',
          opacity: locked ? 0.55 : 1,
        }}
      >
        <thead>
          <tr>
            {WEEKDAYS.map((weekday) => (
              <Box
                component="th"
                key={weekday.name}
                scope="col"
                abbr={weekday.name}
                sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 700, py: 0.5 }}
              >
                {weekday.letter}
              </Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].key}>
              {week.map((cell) => {
                const isToday = cell.dateKey === today
                const isPast = cell.dateKey !== null && cell.dateKey < today
                return (
                  <Box
                    component="td"
                    key={cell.key}
                    aria-current={isToday ? 'date' : undefined}
                    sx={{
                      height: 44,
                      p: 0,
                      borderRadius: '10px',
                      border: `1px solid ${isToday ? colors.navy : 'transparent'}`,
                      color: isPast ? '#6b7584' : colors.navyDarker,
                      fontWeight: isToday ? 700 : 500,
                      fontSize: '0.9rem',
                    }}
                  >
                    {cell.day}
                  </Box>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Box>

      <Divider />
      {locked ? (
        <LockedNote>Events show here for Members</LockedNote>
      ) : (
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>No upcoming Events</Typography>
      )}
    </Stack>
  )
}
