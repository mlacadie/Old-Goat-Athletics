import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * A User (someone with an account). Clerk owns sign-in; this row mirrors what the site needs
 * so later features can join Users to Groups in SQL. `id` is the Clerk user id.
 */
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  email: text('email').notNull(),
  /** Notification preference: email the User when their Groups post. */
  emailNotifications: boolean('email_notifications').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
