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
  /** External site linked from the "Visit Site" button. */
  website: string
  tags: string[]
}
