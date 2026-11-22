/** A link a Group Owner adds to their Group page: a website or a social profile. */
export interface GroupLink {
  /** What the link is called on the Group page, e.g. "Website" or "Instagram". */
  label: string
  url: string
}

/** A club, team, or crew listed on the site. See docs/GLOSSARY.md and the data model in docs/ROADMAP.md. */
export interface Group {
  /** Unique, URL-safe slug, e.g. "old-goat-track-club". Also the Group page path: /groups/<id>. */
  id: string
  name: string
  /** Drives the sport filter on the Groups page. */
  sport: string
  city?: string
  /** Drives the state filter on the Groups page. A postal abbreviation ("MA") in the US and Canada. */
  state?: string
  /** ISO country code, e.g. "US" (see src/data/places.ts). */
  country?: string
  description: string
  tags: string[]
  /** The User who owns the Group and can edit its page. Existing Groups belong to the Site Admin until claimed. */
  ownerId: string
  /** Website and socials shown on the Group page. Up to MAX_GROUP_LINKS; extras are dropped. */
  links?: GroupLink[]
  /** Group image shown on the Group card. Falls back to the default Group image when missing. */
  image?: string
  /** Wide image across the top of the Group page. Falls back to a branded banner when missing. */
  banner?: string
}

/** A city some Group already uses. The Add / Edit Group form suggests these so spellings stay consistent. */
export interface KnownCity {
  city: string
  state: string | null
  country: string | null
}

/**
 * A Group as the Groups page sends it to the browser: without the Owner's user id, which stays on
 * the server, but with whether the viewer owns it or has joined it.
 */
export interface GroupListing extends Omit<Group, 'ownerId'> {
  isOwner: boolean
  /** The viewer joined this Group. False for the Owner, who is a Member by owning it. */
  isMember: boolean
}

/** A Group in My Groups on the profile: one the User owns or has joined. */
export interface MyGroup {
  id: string
  name: string
  sport: string
  /** "City, ST", or empty when the Group has no city or state. */
  location: string
  /** The User owns this Group; otherwise they joined it. */
  isOwner: boolean
}
