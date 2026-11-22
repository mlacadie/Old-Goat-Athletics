import { Stack, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

/** A short line with a lock under a members-only card that non-members see empty, e.g. "Events show here for Members". */
export default function LockedNote({ children }: { children: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary' }}>
      <LockOutlinedIcon sx={{ fontSize: 16 }} />
      <Typography sx={{ fontSize: '0.9rem' }}>{children}</Typography>
    </Stack>
  )
}
