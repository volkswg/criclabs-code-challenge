import { withMiddleware } from '@/middlewares/router.middleware';
import { getDepartmentDataList } from '@/services/department.service';

const getDepartmentListHandler = async () => {
  const departmentDataList = await getDepartmentDataList({
    selectFields: {
      id: true,
      value: true,
    },
  });

  return new Response(
    JSON.stringify({
      data: departmentDataList,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const GET = withMiddleware(getDepartmentListHandler);
