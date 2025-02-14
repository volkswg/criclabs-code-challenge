import { type NextRequest } from 'next/server';
import RequestMiddleware, { ProcessedParams } from './request.middleware';

export const withMiddleware = (
  handler: (params: ProcessedParams) => unknown
) => {
  return async (
    req: NextRequest,
    params: { params: Promise<Record<string, string>> }
  ) => {
    const requestMiddleware = new RequestMiddleware(req, params);
    const processedParams = await requestMiddleware.getRequestParams();
    try {
      return await handler(processedParams);
    } catch (error) {
      console.error({ error });
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
};
