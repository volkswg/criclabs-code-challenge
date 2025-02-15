import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const guardPageHandler = (req: NextRequest) => {
  const accessTokenObj = req.cookies.get('accessToken');
  if (!accessTokenObj) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next(); // Proceed to the next page
};

const loginPageHandler = async (req: NextRequest) => {
  const accessTokenObj = req.cookies.get('accessToken');
  if (accessTokenObj) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next(); // Proceed to the next page
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/login')) {
    return loginPageHandler(req);
  } else {
    return guardPageHandler(req);
  }
}

export const config = {
  matcher:
    '/((?!api|static|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  // matcher:
  //   '/((?!api|static|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)',
};
