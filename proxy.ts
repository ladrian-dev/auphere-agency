// Next.js 16 renamed middleware.ts to proxy.ts.
// This file applies next-intl's locale routing.
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, static files, _next internals, and known assets.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
