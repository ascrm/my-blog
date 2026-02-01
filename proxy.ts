import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle root path - redirect to /zh/home
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh/home', request.url));
  }
  
  // Check if it's a locale root path without trailing slash (e.g., /en or /zh)
  const isLocaleRoot = routing.locales.some(locale => 
    pathname === `/${locale}` || pathname === `/${locale}/`
  );
  
  if (isLocaleRoot) {
    const locale = routing.locales.find(locale => 
      pathname.startsWith(`/${locale}`)
    );
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }
  
  // Handle other paths with next-intl middleware
  return createMiddleware(routing)(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(zh|en)/:path*']
};
