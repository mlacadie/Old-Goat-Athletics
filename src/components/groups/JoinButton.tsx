'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Stack } from '@mui/material'
import { colors } from '../../theme'
import MemberChip from './MemberChip'
import { MembershipErrorSnackbar } from './GroupMembership'
import { useMembershipToggle, useSharedMembership, type Membership } from './useMembership'
import { heroButtonSx, heroOutlinedButtonSx } from './styles'

export type JoinStatus = 'visitor' | 'user' | 'member'
type Tone = 'card' | 'hero' | 'prompt'

const cardButtonSx = { flex: 1, px: 2 }
const promptButtonSx = { minHeight: 48, px: 3.75 }

/**
 * How the button looks on a Group card, on the Group page's hero, and in the members-only join
 * prompt, before and after joining. `signIn` is the label Visitors see. The join prompt is only
 * shown to non-members, so once they join it just waits for the page to unlock.
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
    leave: { label: 'Joining…', variant: 'contained', sx: promptButtonSx },
    signIn: 'Sign in to join',
    wrapperSx: { alignItems: 'center' },
  },
} as const

/**
 * Join, or Leave for Members, on a Group card (`card`), the Group page's hero (`hero`), or the
 * members-only join prompt (`prompt`). Visitors get a link to sign in that brings them back to
 * this page. On the Group page, the buttons share one Membership (see `GroupMembershipProvider`).
 */
export default function JoinButton({ groupId, status, tone }: { groupId: string; status: JoinStatus; tone: Tone }) {
  const shared = useSharedMembership()
  if (status === 'visitor') return <SignInToJoin tone={tone} />
  if (shared) return <JoinToggle membership={shared} tone={tone} />
  return <StandaloneJoinToggle groupId={groupId} initiallyMember={status === 'member'} tone={tone} />
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

/** A Join button with a Membership of its own (a Group card), and its own error message. */
function StandaloneJoinToggle({ groupId, initiallyMember, tone }: { groupId: string; initiallyMember: boolean; tone: Tone }) {
  const { failedAction, showError, dismissError, ...membership } = useMembershipToggle(groupId, initiallyMember)
  return (
    <>
      <JoinToggle membership={membership} tone={tone} />
      <MembershipErrorSnackbar failedAction={failedAction} showError={showError} dismissError={dismissError} />
    </>
  )
}

/** Flips as soon as it's clicked, while the server saves. On the hero, Members also get a Member badge. */
function JoinToggle({ membership: { isMember, isPending, toggle }, tone }: { membership: Membership; tone: Tone }) {
  const look = LOOKS[tone][isMember ? 'leave' : 'join']
  return (
    <Stack direction="row" spacing={1.5} sx={LOOKS[tone].wrapperSx}>
      {tone === 'hero' && isMember && <MemberChip tone="dark" />}
      <Button variant={look.variant} onClick={toggle} disabled={isPending} sx={look.sx}>
        {look.label}
      </Button>
    </Stack>
  )
}
