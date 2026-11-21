'use client'

import { useEffect, useRef, useState } from 'react'
import { IconButton, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { colors } from '../../theme'

const FADE = '40px'

interface ScrollState {
  overflowing: boolean
  atStart: boolean
  atEnd: boolean
}

function readScroll(el: HTMLElement): ScrollState {
  const max = el.scrollWidth - el.clientWidth
  return {
    overflowing: max > 1,
    atStart: el.scrollLeft <= 1,
    atEnd: el.scrollLeft >= max - 1,
  }
}

function sameScroll(a: ScrollState, b: ScrollState) {
  return a.overflowing === b.overflowing && a.atStart === b.atStart && a.atEnd === b.atEnd
}

/** Fades out whichever edge still has pills hidden past it. */
function fadeMask({ overflowing, atStart, atEnd }: ScrollState) {
  if (!overflowing) return 'none'
  const left = atStart ? '#000 0' : `transparent 0, #000 ${FADE}`
  const right = atEnd ? '#000 100%' : `#000 calc(100% - ${FADE}), transparent 100%`
  return `linear-gradient(to right, ${left}, ${right})`
}

const arrowSx = {
  flexShrink: 0,
  width: 44,
  height: 44,
  bgcolor: '#fff',
  border: `1px solid ${colors.grayLight}`,
  color: colors.navy,
  '&:hover': { bgcolor: colors.bone },
  '&.Mui-disabled': { bgcolor: 'transparent', borderColor: 'transparent' },
}

interface SportPillsProps {
  sports: string[]
  value: string
  onChange: (sport: string) => void
}

export default function SportPills({ sports, value, onChange }: SportPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState<ScrollState>({ overflowing: false, atStart: true, atEnd: true })

  const syncScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const next = readScroll(el)
    setScroll((prev) => (sameScroll(prev, next) ? prev : next))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const next = readScroll(el)
      setScroll((prev) => (sameScroll(prev, next) ? prev : next))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: 'smooth' })
  }

  const mask = fadeMask(scroll)

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
      {scroll.overflowing && (
        <IconButton aria-label="Scroll sports left" disabled={scroll.atStart} onClick={() => scrollBy(-1)} sx={arrowSx}>
          <ChevronLeftIcon />
        </IconButton>
      )}

      <ToggleButtonGroup
        ref={scrollRef}
        onScroll={syncScroll}
        value={value}
        exclusive
        onChange={(_event, next) => next && onChange(next)}
        aria-label="Sport"
        size="small"
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: 1,
          py: 0.5,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          maskImage: mask,
          WebkitMaskImage: mask,
          '& .MuiToggleButton-root': {
            flexShrink: 0,
            whiteSpace: 'nowrap',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            minHeight: 44,
            px: 2.25,
            borderRadius: 999,
            bgcolor: '#fff',
            color: colors.navyDarker,
            border: `1px solid ${colors.grayLight}`,
            '&.MuiToggleButtonGroup-grouped': {
              borderRadius: 999,
              border: `1px solid ${colors.grayLight}`,
              ml: 0,
            },
            '&.Mui-selected, &.Mui-selected.MuiToggleButtonGroup-grouped': {
              bgcolor: colors.navy,
              borderColor: colors.navy,
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

      {scroll.overflowing && (
        <IconButton aria-label="Scroll sports right" disabled={scroll.atEnd} onClick={() => scrollBy(1)} sx={arrowSx}>
          <ChevronRightIcon />
        </IconButton>
      )}
    </Stack>
  )
}
