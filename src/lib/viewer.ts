import { auth } from '@clerk/nextjs/server'
import type { Group } from '../types/group'

/**
 * How the person looking at a Group page relates to that Group. Decides what the page shows:
 * Visitors and Users see public info, Members also see members-only content, and the Owner
 * also gets the controls to edit the Group.
 */
export type GroupRole = 'visitor' | 'user' | 'member' | 'owner'

/**
 * The signed-in User's id, or null for a Visitor. Read from the session token, so it makes no
 * network request.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth()
  return userId
}

export function getGroupRole(group: Group, userId: string | null): GroupRole {
  if (!userId) return 'visitor'
  if (userId === group.ownerId) return 'owner'
  // Joining: return 'member' when the User has a Membership in this Group.
  return 'user'
}
