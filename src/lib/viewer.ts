import { currentUser } from '@clerk/nextjs/server'
import type { Group } from '../types/group'
import type { User } from '../types/user'
import { getDisplayName } from './users'

/**
 * How the person looking at a Group page relates to that Group. Decides what the page shows:
 * Visitors and Users see public info, Members also see members-only content, and the Owner
 * also gets the controls to edit the Group.
 */
export type GroupRole = 'visitor' | 'user' | 'member' | 'owner'

/** The signed-in User, or null for a Visitor. */
export async function getCurrentUser(): Promise<User | null> {
  const clerkUser = await currentUser()
  if (!clerkUser) return null
  return { id: clerkUser.id, displayName: getDisplayName(clerkUser) }
}

export function getGroupRole(group: Group, user: User | null): GroupRole {
  if (!user) return 'visitor'
  if (user.id === group.ownerId) return 'owner'
  // Joining: return 'member' when the User has a Membership in this Group.
  return 'user'
}
