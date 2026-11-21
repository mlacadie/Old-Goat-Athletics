/** Shown in place of a name for Users who haven't set one. Never fall back to contact info. */
const UNNAMED_USER = 'Old Goat'

/** How a User is shown to others: their first and last name, or a placeholder. */
export function getDisplayName(firstName: string | null, lastName: string | null): string {
  const name = [firstName, lastName].filter(Boolean).join(' ')
  return name || UNNAMED_USER
}
