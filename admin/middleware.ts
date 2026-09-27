import { NextRequest, NextResponse } from 'next/server';
import { validSession } from './lib/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === '/' || path === '/api/login') return NextResponse.next();
  if (await validSession(request.cookies.get('floure_admin')?.value)) return NextResponse.next();
  if (path.startsWith('/api/')) return NextResponse.json({ message: 'Требуется вход' }, { status: 401 });
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/main/:path*', '/category/:path*', '/product/:path*', '/orders/:path*', '/sender/:path*', '/document/:path*', '/api/backend/:path*', '/api/logout'],
};
