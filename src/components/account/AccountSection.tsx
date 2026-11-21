'use client'

import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import { colors } from '../../theme'

/** Page Section that centers a Clerk sign-in, sign-up, or profile form below the Header. */
export default function AccountSection({ children }: { children: ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: colors.bone,
        pt: { xs: 14, md: 16 },
        pb: { xs: 8, md: 10 },
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {children}
    </Box>
  )
}
