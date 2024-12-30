import createMiddleware from 'next-intl/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { clerkMiddleware } from '@clerk/nextjs/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const combinedMiddleware = async (req: NextRequest, event: NextFetchEvent) => {
  // Run Clerk middleware first
  const clerkHandler = clerkMiddleware();
  const clerkResponse = await clerkHandler(req, event);
  if (clerkResponse) {
    return clerkResponse;
  }

  // Fallback to intl middleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Default behavior: let Next.js handle the request
  return NextResponse.next();
};

export default combinedMiddleware;

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en)/:path*',

    // // Enable redirects that add missing locales
    // // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',

    // Skip Next.js internals and all static files, unless found in search params
    // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
