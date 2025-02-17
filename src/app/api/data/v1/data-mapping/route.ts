import { parseQueryObject } from '@/app/utils/query-string';
import { ProcessedParams } from '@/middlewares/request.middleware';
import { withMiddleware } from '@/middlewares/router.middleware';
import { prisma } from '@/prisma/prisma';

interface DataMappingBody {
  title: string;
  description?: string;
  department: number;
  dataSubjectType?: number[];
}

const createDataMappingHandler = async (params: ProcessedParams) => {
  const { title, description, department, dataSubjectType } =
    params.body as DataMappingBody;

  await prisma.$transaction(async (tx) => {
    const dataMapping = await tx.dataMapping.create({
      data: {
        title,
        description,
        department: { connect: { id: department } },
      },
    });
    if (dataSubjectType && dataSubjectType.length > 0) {
      await tx.dataMappingDataSubjectType.createMany({
        data: dataSubjectType.map((e) => ({
          dataMappingId: dataMapping.id,
          dataSubjectTypeId: e,
        })),
      });
    }
  });

  return new Response(JSON.stringify({}), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

interface ParsedQueryType {
  page?: number;
  pageSize?: number;
  searchText?: string;
  department?: number[];
  dataSubjectType?: number[];
}

const getDataMappingHandler = async (params: ProcessedParams) => {
  const { query } = params;
  const typedQuery = parseQueryObject<ParsedQueryType>(query);

  const page = typedQuery.page || 1;
  const pageSize = typedQuery.pageSize || 999;

  const searchText = typedQuery.searchText;
  const departmentIds = typedQuery.department;
  const dataSubjectTypeIds = typedQuery.dataSubjectType;

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const count = await prisma.dataMapping.count();
  const result = await prisma.dataMapping.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      department: { select: { id: true, value: true } },
      dataMappingDataSubjectType: {
        select: { dataSubjectType: { select: { id: true, value: true } } },
      },
    },
    where: {
      ...(searchText ? { title: { contains: `${searchText}` } } : null),
      ...(departmentIds ? { department: { id: { in: departmentIds } } } : null),
      ...(dataSubjectTypeIds
        ? {
            dataMappingDataSubjectType: {
              some: { dataSubjectType: { id: { in: dataSubjectTypeIds } } },
            },
          }
        : null),
    },
    skip: offset,
    take: limit,
  });

  // transform result
  const transformed = result.map((eDataMapping) => ({
    id: eDataMapping.id,
    title: eDataMapping.title,
    description: eDataMapping.description,
    department: eDataMapping.department,
    dataSubjectType: eDataMapping.dataMappingDataSubjectType.map(
      (e) => e.dataSubjectType
    ),
  }));
  return new Response(
    JSON.stringify({ count: count, page, pageSize, data: transformed }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const POST = withMiddleware(createDataMappingHandler);
export const GET = withMiddleware(getDataMappingHandler);
