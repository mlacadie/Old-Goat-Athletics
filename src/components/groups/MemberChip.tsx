import { Chip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { colors } from '../../theme'
import { heroChipSx } from './styles'

/**
 * Marks a Group the viewer has joined. `light` is the small badge on a Group card; `dark` sits on
 * the Group page's hero next to Leave.
 */
export default function MemberChip({ tone }: { tone: 'light' | 'dark' }) {
  return tone === 'light' ? (
    <Chip
      icon={<CheckIcon />}
      label="Member"
      size="small"
      sx={{ bgcolor: colors.navy, color: '#fff', fontWeight: 700, '& .MuiChip-icon': { color: '#fff' } }}
    />
  ) : (
    <Chip icon={<CheckIcon />} label="Member" sx={heroChipSx} />
  )
}
