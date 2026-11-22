import { colors } from '../../theme'

/** The small uppercase label above a block of Group info or a form section (e.g. "Links"). */
export const sectionLabelSx = {
  color: colors.navy,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
} as const

/** A white button on the Group page's dark hero (Join Group, Edit Group). */
export const heroButtonSx = {
  flexShrink: 0,
  minHeight: 48,
  bgcolor: '#fff',
  color: colors.navy,
  '&:hover': { bgcolor: colors.bone },
} as const

/** A quieter outlined button on the Group page's dark hero (Leave). */
export const heroOutlinedButtonSx = {
  flexShrink: 0,
  minHeight: 48,
  color: '#fff',
  borderColor: 'rgba(255,255,255,0.6)',
  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
} as const

/** A role badge on the Group page's dark hero (Your Group, Member). */
export const heroChipSx = {
  bgcolor: 'rgba(255,255,255,0.14)',
  color: '#fff',
  fontWeight: 700,
  height: 48,
  px: 1,
  '& .MuiChip-icon': { color: '#fff' },
} as const

/** A white card in the Group page's members-only area (Calendar, Members, the join prompt). */
export const panelSx = {
  bgcolor: '#fff',
  border: `1px solid ${colors.grayLight}`,
  borderRadius: '18px',
  p: 2.5,
} as const

/** A card's heading in the members-only area ("Members", the Calendar's month). */
export const panelHeadingSx = {
  m: 0,
  fontSize: '1.1rem',
  fontWeight: 700,
  color: colors.navyDarker,
} as const
