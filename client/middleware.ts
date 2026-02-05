import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Skip Sanity Studio - geen locale prefix!
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }
  
  // Voor alle andere routes: next-intl handelt af
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)']
  //                                ^^^^^^ Studio uitgesloten in matcher!
};