import { type NextRequest } from 'next/server';
import qs from 'query-string';

export type ProcessedParams = {
  path: Record<string, string>;
  query: qs.ParsedQuery<string>;
  body: unknown | null;
};

export default class RequestMiddleware {
  private req: NextRequest;
  private params: Promise<Record<string, string>>;

  constructor(
    req: NextRequest,
    { params }: { params: Promise<Record<string, string>> }
  ) {
    this.params = params;
    this.req = req;
  }

  async getRequestParams() {
    const queryParams = qs.parse(this.req.nextUrl.search, {
      arrayFormat: 'bracket',
    });

    const processedParams: ProcessedParams = {
      path: await this.params,
      query: queryParams,
      body: null,
    };

    try {
      const body = await this.req.json();
      processedParams.body = body;
    } catch {
      /* empty */
    }
    return processedParams;
  }
}
