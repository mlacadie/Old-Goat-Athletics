import 'server-only'
import { cache } from 'react'
import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { groups } from '../db/schema'
import { MAX_GROUP_LINKS } from '../data/groups'
import type { Group } from '../types/group'

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
