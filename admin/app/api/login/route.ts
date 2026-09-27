import { NextRequest, NextResponse } from 'next/server';
import { createSession, validCredentials } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') && new URL(request.headers.get('origin')!).host !== request.headers.get('host')) {
    return NextResponse.json({ message: 'Недопустимый источник' }, { status: 403 });
  }
  let body: { username?: string; password?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Некорректные данные' }, { status: 400 }); }
  if (typeof body.username !== 'string' || typeof body.password !== 'string' ||
      body.username.length > 128 || body.password.length > 256 ||
      !await validCredentials(body.username, body.password)) {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set('floure_admin', await createSession(), {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production',
    path: '/', maxAge: 8 * 60 * 60,
  });
  return response;
}
