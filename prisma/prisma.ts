/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

declare global {
  // Extend the global object with a custom 'prisma' property
  var prisma: PrismaClient | undefined;
}

// Use a single shared instance of PrismaClient
const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma; // Attach Prisma instance to the global object in non-production environments
}

export default prisma;
