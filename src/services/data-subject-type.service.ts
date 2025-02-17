import { prisma } from '@/prisma/prisma';
import { Prisma } from '@prisma/client';

export const getDataSubjectTypeDataList = async ({
  selectFields,
}: {
  selectFields?: Prisma.dataSubjectTypeSelect;
}) =>
  prisma.dataSubjectType.findMany({
    select: selectFields,
  });
