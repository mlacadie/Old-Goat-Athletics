import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'drizzle-kit'

// drizzle-kit runs outside Next.js, so load .env.local the same way Next.js does.
loadEnvConfig(process.cwd())

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set. Add it to .env.local.')

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url },
})
