/** Shown when a Group has no Group image of its own, and behind the Group page's branded banner. */
export const DEFAULT_GROUP_IMAGE = '/logos/OGTC_OGoatG_KC.svg'

/** The most links a Group page shows. Group Owners add them when they add or edit a Group. */
export const MAX_GROUP_LINKS = 3

/** Where the Add a Group form lives. Visitors are sent to sign in first. */
export const ADD_GROUP_PATH = '/groups/new'

/** A Group's Group page. */
export function groupPath(groupId: string): string {
  return `/groups/${groupId}`
}

/** The Group Owner's Edit Group form. */
export function editGroupPath(groupId: string): string {
  return `${groupPath(groupId)}/edit`
}
