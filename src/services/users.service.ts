import { prisma } from '@/prisma/prisma';
import { Prisma } from '@prisma/client';

export const createUsers = async (userData: Prisma.usersCreateInput) => {
  return prisma.users.create({ data: userData });
};

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({ where: { email } });
};
