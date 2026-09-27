const encoder = new TextEncoder();

function base64url(bytes: Uint8Array): string {
  return btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signature(payload: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET is required');
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload))));
}

export async function createSession(): Promise<string> {
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  return `${expires}.${await signature(expires)}`;
}

export async function validSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expires, digest, extra] = token.split('.');
  if (extra || !/^\d{13}$/.test(expires) || Number(expires) < Date.now() || Number(expires) > Date.now() + 8 * 60 * 60 * 1000) return false;
  try {
    const expected = await signature(expires);
    if (expected.length !== digest?.length) return false;
    let difference = 0;
    for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ digest.charCodeAt(index);
    return difference === 0;
  } catch { return false; }
}

export async function validCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword || expectedPassword.length < 16) return false;
  const [actual, expected] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(`${username}\u0000${password}`)),
    crypto.subtle.digest('SHA-256', encoder.encode(`${expectedUser}\u0000${expectedPassword}`)),
  ]);
  const left = new Uint8Array(actual);
  const right = new Uint8Array(expected);
  let difference = 0;
  for (let index = 0; index < left.length; index++) difference |= left[index] ^ right[index];
  return difference === 0;
}
