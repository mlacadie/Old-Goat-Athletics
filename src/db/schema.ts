import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import type { GroupLink } from '../types/group'

/**
 * A User (someone with an account). Clerk owns sign-in; this row mirrors what the site needs
 * so later features can join Users to Groups in SQL. `id` is the Clerk user id.
 */
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  /** Primary email from Clerk; null if the account has none. */
  email: text('email'),
  /** Notification preference: email the User when their Groups post. */
  emailNotifications: boolean('email_notifications').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

/**
 * A Group listed on the Groups page. `id` is its URL slug (/groups/<id>). See the `Group` type in
 * src/types/group.ts, which lib/groups.ts maps rows to.
 */
export const groups = pgTable('groups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  sport: text('sport').notNull(),
  city: text('city'),
  state: text('state'),
  country: text('country'),
  description: text('description').notNull(),
  tags: text('tags').array().notNull().default([]),
  /** Up to MAX_GROUP_LINKS links, each a label and a URL. */
  links: jsonb('links').$type<GroupLink[]>().notNull().default([]),
  image: text('image'),
  banner: text('banner'),
  /**
   * The Group Owner's Clerk user id. Not a foreign key to users: placeholder Groups are owned by
   * "site-admin", which isn't a real account.
   */
  ownerId: text('owner_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
