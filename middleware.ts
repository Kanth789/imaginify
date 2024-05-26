import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'];

const middleware = (req: NextRequest, event: any) => {
  const { pathname } = req.nextUrl;

  // Check if the current route is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // For all other routes, use the Clerk middleware
  return clerkMiddleware()(req, event);
};

export default middleware;

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)' // Run middleware on API routes
  ],
};
