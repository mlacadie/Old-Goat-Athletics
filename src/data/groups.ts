import type { Group } from '../types/group'
import clubs from './clubs.json'

/** Shown when a Group has no Group image of its own, and behind the Group page's branded banner. */
export const DEFAULT_GROUP_IMAGE = '/logos/OGTC_OGoatG_KC.svg'

/** The most links a Group page shows. Group Owners add them when they add or edit a Group. */
export const MAX_GROUP_LINKS = 3

/**
 * Every Group listed on the site. Stored in clubs.json until Groups move to a database.
 * Groups listed before Accounts existed are owned by the placeholder "site-admin" until claimed.
 */
export const GROUPS: Group[] = clubs.map((club) => ({
  ...club,
  links: club.links.slice(0, MAX_GROUP_LINKS),
}))

export function getGroup(id: string): Group | undefined {
  return GROUPS.find((group) => group.id === id)
}
