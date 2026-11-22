import 'server-only'
import { and, asc, eq, or, sql } from 'drizzle-orm'
import { getDb } from '../db'
import { groups, memberships } from '../db/schema'
import type { MyGroup } from '../types/group'

/**
 * Makes `userId` a Member of the Group. Does nothing if they already are, own the Group, or there
 * is no such Group, so a double-click or a stale page can't fail. The User's row must already
 * exist (see `ensureUser` in users.ts).
 */
export async function addMembership(userId: string, groupId: string): Promise<void> {
  await getDb().execute(sql`
    insert into ${memberships} (${sql.identifier(memberships.userId.name)}, ${sql.identifier(memberships.groupId.name)})
    select ${userId}, ${groups.id} from ${groups}
    where ${groups.id} = ${groupId} and ${groups.ownerId} <> ${userId}
    on conflict do nothing
  `)
}

/** Ends `userId`'s Membership in the Group. Does nothing if they weren't a Member. */
export async function removeMembership(userId: string, groupId: string): Promise<void> {
  await getDb()
    .delete(memberships)
    .where(and(eq(memberships.userId, userId), eq(memberships.groupId, groupId)))
}

/** Whether `userId` has joined the Group. Owners count as Members without a row; check that first. */
export async function hasJoined(userId: string, groupId: string): Promise<boolean> {
  const [row] = await getDb()
    .select({ groupId: memberships.groupId })
    .from(memberships)
    .where(and(eq(memberships.userId, userId), eq(memberships.groupId, groupId)))
  return row !== undefined
}

/** The ids of every Group `userId` has joined (not counting Groups they own). */
export async function listJoinedGroupIds(userId: string): Promise<Set<string>> {
  const rows = await getDb()
    .select({ groupId: memberships.groupId })
    .from(memberships)
    .where(eq(memberships.userId, userId))
  return new Set(rows.map((row) => row.groupId))
}

/** Every Group `userId` owns or has joined, for My Groups on the profile, sorted by name. */
export async function listMyGroups(userId: string): Promise<MyGroup[]> {
  const rows = await getDb()
    .select({
      id: groups.id,
      name: groups.name,
      sport: groups.sport,
      city: groups.city,
      state: groups.state,
      ownerId: groups.ownerId,
    })
    .from(groups)
    .leftJoin(memberships, and(eq(memberships.groupId, groups.id), eq(memberships.userId, userId)))
    .where(or(eq(groups.ownerId, userId), eq(memberships.userId, userId)))
    .orderBy(asc(groups.name))
  return rows.map(({ ownerId, city, state, ...group }) => ({
    ...group,
    location: [city, state].filter(Boolean).join(', '),
    isOwner: ownerId === userId,
  }))
}
