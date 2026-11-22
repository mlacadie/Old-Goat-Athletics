import 'server-only'
import type { Group, MembersOnlyContent } from '../types/group'
import { listGroupMembers } from './memberships'
import { canSeeMembersOnly, type GroupRole } from './viewer'

/**
 * The one place members-only content for a Group page is loaded. Returns null unless the viewer is
 * a Member or the Owner, so non-members never get it in the page, however they ask for it.
 */
export async function getMembersOnlyContent(
  group: Pick<Group, 'id' | 'ownerId'>,
  role: GroupRole,
  userId: string | null,
): Promise<MembersOnlyContent | null> {
  if (!userId || !canSeeMembersOnly(role)) return null
  return { members: await listGroupMembers(group, userId) }
}
