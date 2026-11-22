import { Chip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { colors } from '../../theme'
import { heroChipSx } from './styles'

/**
 * Marks a Group the viewer owns. `light` is the small badge on a Group card; `dark` sits on the
 * Group page's hero next to Edit Group.
 */
export default function YourGroupChip({ tone }: { tone: 'light' | 'dark' }) {
  const starSx = { '& .MuiChip-icon': { color: colors.goldLight } }
  return tone === 'light' ? (
    <Chip
      icon={<StarIcon />}
      label="Your Group"
      size="small"
      sx={{ bgcolor: colors.navy, color: '#fff', fontWeight: 700, ...starSx }}
    />
  ) : (
    <Chip icon={<StarIcon />} label="Your Group" sx={{ ...heroChipSx, ...starSx }} />
  )
}
