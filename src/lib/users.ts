import 'server-only'
import { eq } from 'drizzle-orm'
import type { User as ClerkUser } from '@clerk/nextjs/server'
import { db } from '../db'
import { users } from '../db/schema'

/** Shown in place of a name for Users who haven't set one. Never fall back to contact info. */
const UNNAMED_USER = 'Member'

export function getDisplayName(clerkUser: ClerkUser): string {
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ')
  return name || UNNAMED_USER
}

/** Creates or updates the User's row from their Clerk account. Keeps their preferences. */
export async function syncUser(clerkUser: ClerkUser): Promise<void> {
  const profile = {
    displayName: getDisplayName(clerkUser),
    email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
    updatedAt: new Date(),
  }
  await db
    .insert(users)
    .values({ id: clerkUser.id, ...profile })
    .onConflictDoUpdate({ target: users.id, set: profile })
}

export async function deleteUser(userId: string): Promise<void> {
  await db.delete(users).where(eq(users.id, userId))
}

export async function getEmailNotifications(userId: string): Promise<boolean> {
  const [row] = await db
    .select({ emailNotifications: users.emailNotifications })
    .from(users)
    .where(eq(users.id, userId))
  return row?.emailNotifications ?? true
}

export async function setEmailNotifications(userId: string, enabled: boolean): Promise<void> {
  await db
    .update(users)
    .set({ emailNotifications: enabled, updatedAt: new Date() })
    .where(eq(users.id, userId))
}
