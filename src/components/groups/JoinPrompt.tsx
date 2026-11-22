import { Box, Typography } from '@mui/material'
import { colors } from '../../theme'
import JoinButton from './JoinButton'

/**
 * Shown to Visitors and Users who haven't joined, in place of the Next up card: what Members get,
 * and a button to join (or sign in first).
 */
export default function JoinPrompt({ groupId, status }: { groupId: string; status: 'visitor' | 'user' }) {
  return (
    <Box
      component="section"
      aria-labelledby="join-prompt-heading"
      sx={{
        bgcolor: '#fff',
        border: `1px solid ${colors.grayLight}`,
        borderRadius: '18px',
        px: { xs: 3, md: 3.5 },
        py: { xs: 4, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1.75,
      }}
    >
      <Typography
        sx={{
          color: colors.navy,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
        }}
      >
        Members only
      </Typography>
      <Typography id="join-prompt-heading" variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, lineHeight: 1 }}>
        See what&rsquo;s next, and who&rsquo;s going
      </Typography>
      <Typography sx={{ color: 'text.secondary', lineHeight: 1.65, maxWidth: 520 }}>
        {status === 'visitor'
          ? 'Sign in and join to see the Group’s upcoming Events, Calendar, Announcements, and Members. Joining also turns on email Notifications when the Group posts.'
          : 'Join to see the Group’s upcoming Events, Calendar, Announcements, and Members. Joining also turns on email Notifications when the Group posts.'}
      </Typography>
      <Box sx={{ mt: 0.75 }}>
        <JoinButton groupId={groupId} status={status} tone="prompt" />
      </Box>
    </Box>
  )
}
