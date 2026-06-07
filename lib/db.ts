import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    max: 1,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 20000,
    allowExitOnIdle: true,
  })
  return new PrismaClient({
    adapter,
    log: ['error'],
  })
}

// In dev, always create a fresh client to avoid stale connections after hot reload
export const prisma =
  process.env.NODE_ENV === 'production'
    ? (globalForPrisma.prisma ?? (globalForPrisma.prisma = createClient()))
    : createClient()
