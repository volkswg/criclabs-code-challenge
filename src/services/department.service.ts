import { prisma } from '@/prisma/prisma';
import { Prisma } from '@prisma/client';

export const getDepartmentDataList = async ({
  selectFields,
}: {
  selectFields?: Prisma.departmentSelect;
}) =>
  prisma.department.findMany({
    select: selectFields,
  });
