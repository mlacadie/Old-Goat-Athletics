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
  /** Drives the state filter on the Groups page. */
  state?: string
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
