import { type NextRequest } from 'next/server';
import RequestMiddleware, { ProcessedParams } from './request.middleware';
import { getCookies } from '@/services/cookies.service';
import { verifyAccessToken } from '@/services/auth-token.service';
import { AppError } from '@/exceptions/app-error';
import { InternalServerError } from '@/exceptions/internal-error';
import { UnauthorizedError } from '@/exceptions/unauthorized-error';

export const withMiddleware = (
  handler: (params: ProcessedParams) => unknown,
  needAuth: boolean = true
) => {
  return async (
    req: NextRequest,
    params: { params: Promise<Record<string, string>> }
  ) => {
    try {
      // auth section
      if (needAuth) {
        const accessTokenObj = getCookies(req.cookies, 'accessToken');
        if (!accessTokenObj) {
          throw new UnauthorizedError('Unauthorized');
        }
        const { value: accessToken } = accessTokenObj;
        try {
          await verifyAccessToken(accessToken);
        } catch (err) {
          console.log(err);
          throw new UnauthorizedError('Unauthorized');
        }
      }

      const requestMiddleware = new RequestMiddleware(req, params);
      const processedParams = await requestMiddleware.getRequestParams();
      return await handler(processedParams);
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        // Custom error handling for known errors
        return Response.json(
          { message: error.message },
          { status: error.statusCode }
        );
      }

      const internalError = new InternalServerError();
      // Handle unexpected errors
      return Response.json(
        { message: internalError.message },
        { status: internalError.statusCode }
      );

      console.error({ error });
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
};
