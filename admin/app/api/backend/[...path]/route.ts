import { NextRequest, NextResponse } from 'next/server';
import { validSession } from '@/lib/session';

export const dynamic = 'force-dynamic';
const methods = ['GET', 'POST', 'PATCH', 'PUT'];

async function proxy(request: NextRequest, { params }: { params: { path: string[] } }) {
  if (!await validSession(request.cookies.get('floure_admin')?.value)) return NextResponse.json({ message: 'Требуется вход' }, { status: 401 });
  if (!methods.includes(request.method) || !['category', 'catalog', 'order'].includes(params.path[0]) ||
      params.path.length > 3 || params.path.some(part => !/^[a-zA-Z0-9_-]+$/.test(part))) {
    return NextResponse.json({ message: 'Недопустимый запрос' }, { status: 400 });
  }
  if (request.method !== 'GET') {
    const origin = request.headers.get('origin');
    if (!origin || new URL(origin).host !== request.headers.get('host')) return NextResponse.json({ message: 'Недопустимый источник' }, { status: 403 });
  }
  const apiKey = process.env.ADMIN_API_KEY;
  if (!apiKey || apiKey.length < 32) return NextResponse.json({ message: 'Не настроен ключ API' }, { status: 503 });
  const base = process.env.API_INTERNAL_URL || process.env.API_URL || 'http://127.0.0.1:8000';
  const url = new URL(`${base.replace(/\/$/, '')}/${params.path.join('/')}`);
  url.search = request.nextUrl.search;
  const headers = new Headers({ 'x-admin-key': apiKey });
  const type = request.headers.get('content-type');
  if (type) headers.set('content-type', type);
  const body = request.method === 'GET' ? undefined : await request.arrayBuffer();
  if (body && body.byteLength > 10 * 1024 * 1024) return NextResponse.json({ message: 'Файл слишком большой' }, { status: 413 });
  try {
    const upstream = await fetch(url, { method: request.method, headers, body, cache: 'no-store' });
    const responseHeaders = new Headers();
    if (upstream.headers.get('content-type')) responseHeaders.set('content-type', upstream.headers.get('content-type')!);
    responseHeaders.set('cache-control', 'no-store');
    return new NextResponse(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch {
    return NextResponse.json({ message: 'Сервер недоступен' }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT };
