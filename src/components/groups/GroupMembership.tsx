'use client'

import type { ReactNode } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { MembershipContext, useMembershipToggle, type MembershipWithError } from './useMembership'

/** Says which Membership change failed to save. */
export function MembershipErrorSnackbar({ failedAction, showError, dismissError }: Pick<MembershipWithError, 'failedAction' | 'showError' | 'dismissError'>) {
  return (
    <Snackbar open={showError} autoHideDuration={6000} onClose={dismissError}>
      <Alert severity="error" variant="filled" onClose={dismissError}>
        Couldn&rsquo;t {failedAction} that Group. Please try again.
      </Alert>
    </Snackbar>
  )
}

/** Gives every Join button inside it one shared Membership for the Group, with one error message. */
export function GroupMembershipProvider({
  groupId,
  initiallyMember,
  children,
}: {
  groupId: string
  initiallyMember: boolean
  children: ReactNode
}) {
  const { failedAction, showError, dismissError, ...membership } = useMembershipToggle(groupId, initiallyMember)
  return (
    <MembershipContext value={membership}>
      {children}
      <MembershipErrorSnackbar failedAction={failedAction} showError={showError} dismissError={dismissError} />
    </MembershipContext>
  )
}
