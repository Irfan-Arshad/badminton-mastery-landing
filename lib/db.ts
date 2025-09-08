import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

let initialized = false;
export async function ensureDb() {
  if (initialized) return;
  initialized = true;
  const url = process.env.DATABASE_URL || '';
  if (url.startsWith('file:')) {
    try {
      await prisma.$executeRawUnsafe(
        'CREATE TABLE IF NOT EXISTS "Waitlist" ("id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "email" TEXT NOT NULL UNIQUE, "phone" TEXT NOT NULL, "consent" INTEGER NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
      );
    } catch (e) {
      // ignore: prisma migrate is preferred; this is a dev convenience
    }
  }
}

