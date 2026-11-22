/** Shown in place of a name for Users who haven't set one. Never fall back to contact info. */
const UNNAMED_USER = 'Old Goat'

/** How a User is shown to others: their first and last name, or a placeholder. */
export function getDisplayName(firstName: string | null, lastName: string | null): string {
  const name = [firstName, lastName].filter(Boolean).join(' ')
  return name || UNNAMED_USER
}

/** Up to two initials for a display name's avatar, e.g. "Dana Park" → "DP", "Old Goat" → "OG". */
export function getInitials(displayName: string): string {
  const words = displayName.trim().split(/\s+/).filter(Boolean)
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words
  return letters.map((word) => (Array.from(word)[0] ?? '').toUpperCase()).join('')
}
