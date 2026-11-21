/** A club, team, or crew listed on the site. See docs/GLOSSARY.md and the data model in docs/ROADMAP.md. */
export interface Group {
  /** Unique, URL-safe slug, e.g. "old-goat-track-club". */
  id: string
  name: string
  /** Drives the sport filter on the Groups page. */
  sport: string
  city?: string
  /** Drives the state filter on the Groups page. */
  state?: string
  country?: string
  description: string
  /** The Group's external website. Will be shown on its Group page. */
  website: string
  tags: string[]
  /** Group image shown on the Group card. Falls back to the default Group image when missing. */
  image?: string
}
