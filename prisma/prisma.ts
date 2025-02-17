import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In development, Next.js hot-reloads, which may cause multiple instances of PrismaClient, leading to database connection issues.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;