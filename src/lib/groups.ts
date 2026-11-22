import 'server-only'
import { cache } from 'react'
import { and, asc, eq, isNotNull, like, or } from 'drizzle-orm'
import { getDb } from '../db'
import { groups } from '../db/schema'
import { MAX_GROUP_LINKS } from '../data/groups'
import type { Group, GroupListing, KnownCity } from '../types/group'
import type { GroupInput } from './groupForm'
import { listJoinedGroupIds } from './memberships'
import { getGroupRole } from './viewer'

/** Paths under /groups that a Group id must never take. */
const RESERVED_IDS = new Set(['new'])

type GroupRow = typeof groups.$inferSelect

/** Turns a database row into a `Group`: empty columns become missing fields, extra links are dropped. */
function toGroup(row: GroupRow): Group {
  return {
    id: row.id,
    name: row.name,
    sport: row.sport,
    city: row.city ?? undefined,
    state: row.state ?? undefined,
    country: row.country ?? undefined,
    description: row.description,
    tags: row.tags,
    ownerId: row.ownerId,
    links: row.links.slice(0, MAX_GROUP_LINKS),
    image: row.image ?? undefined,
    banner: row.banner ?? undefined,
  }
}

/** Every Group on the Groups page, oldest first. */
export async function listGroups(): Promise<Group[]> {
  const rows = await getDb().select().from(groups).orderBy(asc(groups.createdAt), asc(groups.name))
  return rows.map(toGroup)
}

/** One Group by its id, or undefined. Cached per request, so metadata and the page share one query. */
export const getGroup = cache(async (id: string): Promise<Group | undefined> => {
  const [row] = await getDb().select().from(groups).where(eq(groups.id, id))
  return row ? toGroup(row) : undefined
})

/** A URL-safe slug from a Group name: "Old Goats & Friends!" becomes "old-goats-and-friends". */
function slugify(name: string): string {
  const slug = name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z\d]+/g, '-')
    .slice(0, 60)
    .replace(/^-+|-+$/g, '')
  return slug || 'group'
}

/** The slug, or the first free "<slug>-2", "<slug>-3", ... if another Group already has it. */
async function uniqueGroupId(name: string): Promise<string> {
  const base = slugify(name)
  const rows = await getDb()
    .select({ id: groups.id })
    .from(groups)
    // The slug is only letters, digits, and dashes, so it can't contain LIKE wildcards.
    .where(or(eq(groups.id, base), like(groups.id, `${base}-%`)))
  const taken = new Set([...rows.map((row) => row.id), ...RESERVED_IDS])
  if (!taken.has(base)) return base
  let suffix = 2
  while (taken.has(`${base}-${suffix}`)) suffix += 1
  return `${base}-${suffix}`
}

/** Adds a Group owned by `ownerId` and returns its id. */
export async function createGroup(input: GroupInput, ownerId: string): Promise<string> {
  const id = await uniqueGroupId(input.name)
  await getDb().insert(groups).values({ ...input, id, ownerId })
  return id
}

/**
 * Saves changes to a Group, but only if `ownerId` owns it. Returns false when there is no such
 * Group or it belongs to someone else. The id stays the same, so links to the Group page keep working.
 */
export async function updateGroup(id: string, ownerId: string, input: GroupInput): Promise<boolean> {
  const updated = await getDb()
    .update(groups)
    .set({ ...input, updatedAt: new Date() })
    .where(and(eq(groups.id, id), eq(groups.ownerId, ownerId)))
    .returning({ id: groups.id })
  return updated.length > 0
}

/** Every distinct city, state, and country Groups are in, sorted by city. */
export async function listKnownCities(): Promise<KnownCity[]> {
  const rows = await getDb()
    .selectDistinct({ city: groups.city, state: groups.state, country: groups.country })
    .from(groups)
    .where(isNotNull(groups.city))
    .orderBy(asc(groups.city))
  return rows.flatMap((row) => (row.city ? [{ ...row, city: row.city }] : []))
}

/**
 * Every Group for the Groups page, marked with whether `userId` owns it or has joined it. Owner ids
 * stay on the server.
 */
export async function listGroupsFor(userId: string | null): Promise<GroupListing[]> {
  const [all, joined] = await Promise.all([
    listGroups(),
    userId ? listJoinedGroupIds(userId) : new Set<string>(),
  ])
  return all.map(({ ownerId, ...group }) => {
    const role = getGroupRole({ ownerId }, userId, joined.has(group.id))
    return { ...group, isOwner: role === 'owner', isMember: role === 'member' }
  })
}
