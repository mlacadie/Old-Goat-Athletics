'use client'

import { useOptimistic, useState, useTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Alert, Button, Snackbar, Stack } from '@mui/material'
import { colors } from '../../theme'
import { joinGroup, leaveGroup } from '../../app/groups/actions'
import MemberChip from './MemberChip'
import { heroButtonSx, heroOutlinedButtonSx } from './styles'

export type JoinStatus = 'visitor' | 'user' | 'member'
type Tone = 'card' | 'hero' | 'prompt'

const cardButtonSx = { flex: 1, px: 2 }
const promptButtonSx = { minHeight: 48, px: 3.75 }

/**
 * How the button looks on a Group card, on the Group page's hero, and in the members-only join
 * prompt, before and after joining. `signIn` is the label Visitors see.
 */
const LOOKS = {
  card: {
    join: { label: 'Join', variant: 'contained', sx: cardButtonSx },
    leave: { label: 'Leave', variant: 'outlined', sx: { ...cardButtonSx, color: colors.navy, borderColor: colors.navy } },
    signIn: 'Join',
    wrapperSx: { flex: 1, display: 'flex' },
  },
  hero: {
    join: { label: 'Join Group', variant: 'contained', sx: heroButtonSx },
    leave: { label: 'Leave', variant: 'outlined', sx: heroOutlinedButtonSx },
    signIn: 'Join Group',
    wrapperSx: { flexShrink: 0, alignItems: 'center' },
  },
  prompt: {
    join: { label: 'Join Group', variant: 'contained', sx: promptButtonSx },
    leave: { label: 'Leave', variant: 'outlined', sx: promptButtonSx },
    signIn: 'Sign in to join',
    wrapperSx: { alignItems: 'center' },
  },
} as const

/**
 * Join, or Leave for Members, on a Group card (`card`), the Group page's hero (`hero`), or the
 * members-only join prompt (`prompt`). Visitors get a link to sign in that brings them back to
 * this page.
 */
export default function JoinButton({ groupId, status, tone }: { groupId: string; status: JoinStatus; tone: Tone }) {
  if (status === 'visitor') return <SignInToJoin tone={tone} />
  return <JoinToggle groupId={groupId} initiallyMember={status === 'member'} tone={tone} />
}

function SignInToJoin({ tone }: { tone: Tone }) {
  const pathname = usePathname()
  const look = LOOKS[tone].join
  return (
    <Button component={Link} href={`/sign-in?redirect_url=${encodeURIComponent(pathname)}`} variant={look.variant} sx={look.sx}>
      {LOOKS[tone].signIn}
    </Button>
  )
}

/**
 * Flips as soon as it's clicked, while the server saves. The page then refreshes with the saved
 * state; if saving failed, the button flips back and a message says so. On the hero, Members also
 * get a Member badge.
 */
function JoinToggle({ groupId, initiallyMember, tone }: { groupId: string; initiallyMember: boolean; tone: Tone }) {
  const [isMember, setOptimisticMember] = useOptimistic(initiallyMember)
  const [isPending, startTransition] = useTransition()
  const [failedAction, setFailedAction] = useState<'join' | 'leave'>('join')
  const [showError, setShowError] = useState(false)
  const look = LOOKS[tone][isMember ? 'leave' : 'join']

  const toggle = () => {
    const joining = !isMember
    setShowError(false)
    startTransition(async () => {
      setOptimisticMember(joining)
      try {
        await (joining ? joinGroup(groupId) : leaveGroup(groupId))
      } catch {
        setFailedAction(joining ? 'join' : 'leave')
        setShowError(true)
      }
    })
  }

  return (
    <Stack direction="row" spacing={1.5} sx={LOOKS[tone].wrapperSx}>
      {tone === 'hero' && isMember && <MemberChip tone="dark" />}
      <Button variant={look.variant} onClick={toggle} disabled={isPending} sx={look.sx}>
        {look.label}
      </Button>
      <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
        <Alert severity="error" variant="filled" onClose={() => setShowError(false)}>
          Couldn&rsquo;t {failedAction} that Group. Please try again.
        </Alert>
      </Snackbar>
    </Stack>
  )
}
