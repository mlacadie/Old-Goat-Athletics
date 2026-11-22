import 'server-only'
import type { Group, MembersOnlyContent } from '../types/group'
import { listGroupMembers } from './memberships'
import { ensureUser } from './users'
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
  // Owners who added their Group before `addGroup` made their row get one here, so they're listed.
  if (role === 'owner') await ensureUser(userId)
  return { members: await listGroupMembers(group, userId) }
}
