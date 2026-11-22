'use client'

import { createContext, use, useOptimistic, useState, useTransition } from 'react'
import { joinGroup, leaveGroup } from '../../app/groups/actions'

export interface Membership {
  isMember: boolean
  isPending: boolean
  toggle: () => void
}

export interface MembershipWithError extends Membership {
  failedAction: 'join' | 'leave'
  showError: boolean
  dismissError: () => void
}

/**
 * Whether the viewer is a Member, flipped as soon as they join or leave while the server saves.
 * The page then refreshes with the saved state; if saving failed, it flips back and `failedAction` says
 * which action failed.
 */
export function useMembershipToggle(groupId: string, initiallyMember: boolean): MembershipWithError {
  const [isMember, setOptimisticMember] = useOptimistic(initiallyMember)
  const [isPending, startTransition] = useTransition()
  // Kept after the message closes, so its text doesn't change while it fades out.
  const [failedAction, setFailedAction] = useState<'join' | 'leave'>('join')
  const [showError, setShowError] = useState(false)

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

  return { isMember, isPending, toggle, failedAction, showError, dismissError: () => setShowError(false) }
}

/** Set by `GroupMembershipProvider` on a Group page. */
export const MembershipContext = createContext<Membership | null>(null)

/** The Group page's shared Membership, so its Join buttons (hero and join prompt) agree. Null elsewhere. */
export function useSharedMembership(): Membership | null {
  return use(MembershipContext)
}
