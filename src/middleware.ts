import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '../i18nConfig';
import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // authentication routes — let the middleware handle it
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return await auth0.middleware(request);
  }
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
