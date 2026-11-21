import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type Database = ReturnType<typeof drizzle<typeof schema>>

let database: Database | undefined

/**
 * The Neon Postgres database. Server code only. Created on first use, so pages that never query
 * it (and `yarn build`) don't need DATABASE_URL.
 */
export function getDb(): Database {
  if (!database) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL is not set. Add it to .env.local.')
    database = drizzle(url, { schema })
  }
  return database
}
