import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config()

export default defineConfig({
  dialect: 'postgresql',
  schema: './shared/db/schema.ts',
  out: './shared/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})