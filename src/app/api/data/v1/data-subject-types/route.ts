import { withMiddleware } from '@/middlewares/router.middleware';
import { getDataSubjectTypeDataList } from '@/services/data-subject-type.service';

const getDataSubjectTypeHandler = async () => {
  const dataSubjectTypeDataList = await getDataSubjectTypeDataList({
    selectFields: { id: true, value: true },
  });
  return new Response(
    JSON.stringify({
      data: dataSubjectTypeDataList,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const GET = withMiddleware(getDataSubjectTypeHandler);
