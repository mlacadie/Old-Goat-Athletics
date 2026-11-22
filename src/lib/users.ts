import 'server-only'
import { eq, sql } from 'drizzle-orm'
import { currentUser, type User as ClerkUser, type UserJSON } from '@clerk/nextjs/server'
import { getDb } from '../db'
import { users } from '../db/schema'
import { getDisplayName } from './displayName'

/** The parts of a Clerk account the users table mirrors. */
export interface UserRecord {
  id: string
  displayName: string
  /** Null when the account has no primary email address. */
  email: string | null
}

export function userRecordFromClerk(clerkUser: ClerkUser): UserRecord {
  return {
    id: clerkUser.id,
    displayName: getDisplayName(clerkUser.firstName, clerkUser.lastName),
    email: clerkUser.primaryEmailAddress?.emailAddress ?? null,
  }
}

/** Same as `userRecordFromClerk`, from the user data in a Clerk webhook event. */
export function userRecordFromWebhook(data: UserJSON): UserRecord {
  const primaryEmail = data.email_addresses.find(
    (address) => address.id === data.primary_email_address_id,
  )
  return {
    id: data.id,
    displayName: getDisplayName(data.first_name, data.last_name),
    email: primaryEmail?.email_address ?? null,
  }
}

/**
 * Creates the User's row, or updates its name and email if they changed. Keeps their
 * preferences, and skips the write when nothing changed.
 */
export async function syncUser({ id, displayName, email }: UserRecord): Promise<void> {
  await getDb()
    .insert(users)
    .values({ id, displayName, email })
    .onConflictDoUpdate({
      target: users.id,
      set: { displayName, email, updatedAt: new Date() },
      setWhere: sql`(${users.displayName}, ${users.email}) is distinct from (excluded.display_name, excluded.email)`,
    })
}

/**
 * Makes sure the signed-in User has a row, which tables like memberships point to. The webhook
 * usually created it already; if not (local development, a missed webhook), it's made from
 * their Clerk account, which costs a call to Clerk only in that case.
 */
export async function ensureUser(userId: string): Promise<void> {
  const [row] = await getDb().select({ id: users.id }).from(users).where(eq(users.id, userId))
  if (row) return
  const clerkUser = await currentUser()
  if (clerkUser?.id !== userId) throw new Error('Signed-in User not found in Clerk.')
  await syncUser(userRecordFromClerk(clerkUser))
}

export async function deleteUser(userId: string): Promise<void> {
  await getDb().delete(users).where(eq(users.id, userId))
}

export async function getEmailNotifications(userId: string): Promise<boolean> {
  const [row] = await getDb()
    .select({ emailNotifications: users.emailNotifications })
    .from(users)
    .where(eq(users.id, userId))
  return row?.emailNotifications ?? true
}

export async function setEmailNotifications(userId: string, enabled: boolean): Promise<void> {
  await getDb()
    .update(users)
    .set({ emailNotifications: enabled, updatedAt: new Date() })
    .where(eq(users.id, userId))
}
