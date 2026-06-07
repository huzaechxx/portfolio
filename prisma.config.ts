import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// Prisma CLI doesn't read .env.local — load it manually
config({ path: path.resolve(process.cwd(), '.env.local') })

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DIRECT_URL as string,
  },
})
