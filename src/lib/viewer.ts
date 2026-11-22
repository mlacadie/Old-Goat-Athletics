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

/**
 * The viewer's role in a Group. `hasJoined` says whether the User has a Membership in it; the
 * Owner is a Member by owning the Group, so it doesn't matter for them.
 */
export function getGroupRole(group: Pick<Group, 'ownerId'>, userId: string | null, hasJoined: boolean): GroupRole {
  if (!userId) return 'visitor'
  if (userId === group.ownerId) return 'owner'
  return hasJoined ? 'member' : 'user'
}

/** Members and the Owner see members-only content (Announcements, Events, the Members list). */
export function canSeeMembersOnly(role: GroupRole): boolean {
  return role === 'member' || role === 'owner'
}
