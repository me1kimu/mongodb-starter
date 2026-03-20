import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Middleware to protect routes and add authorization checks
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Allow public access to home and public profile pages,
    // but exclude reserved single-segment routes like /settings and /profile
    if (
      pathname === '/' ||
      (pathname.match(/^\/[^\/]+$/) &&
        pathname !== '/settings' &&
        pathname !== '/profile')
    ) {
      return NextResponse.next();
    }

    // Protected routes require authentication
    if (!token && (pathname.startsWith('/settings') || pathname.startsWith('/profile'))) {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }

    // API routes authorization
    if (pathname.startsWith('/api/user') && req.method === 'PUT') {
      // Additional validation will be performed in the API route handler
      // This middleware just ensures a session exists
      if (!token) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public routes
        if (
          pathname === '/' ||
          (pathname.match(/^\/[^\/]+$/) &&
            pathname !== '/settings' &&
            pathname !== '/profile') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/api/auth')
        ) {
          return true;
        }

        // Protected routes require a token
        if (pathname.startsWith('/settings') || pathname.startsWith('/profile')) {
          return !!token;
        }

        // API routes
        if (pathname.startsWith('/api/user')) {
          if (req.method === 'GET') {
            return true; // GET is public for user search
          }
          return !!token; // Other methods require auth
        }

        // Default: allow
        return true;
      }
    },
    pages: {
      signIn: '/',
    }
  }
);

// Configure which routes should use the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - common image assets (png, jpg, jpeg, gif, svg)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ]
};
