import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const protectedRoutes = ['/admin'];
const authRoute = '/admin/login';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's an admin route (but not the login page)
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(route) && !pathname.startsWith(authRoute)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get('tgm_admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL(authRoute, request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL(authRoute, request.url));
      response.cookies.delete('tgm_admin_token');
      return response;
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
