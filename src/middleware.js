import { NextResponse } from 'next/server';

// JWT verification using Web Crypto API
async function verifyJWT(token) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    
    const textEncoder = new TextEncoder();
    const keyData = textEncoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      textEncoder.encode(`${headerB64}.${payloadB64}`)
    );

    if (!isValid) return null;

    const payload = JSON.parse(atob(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp < now) return null;
    
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/login';

  console.log('Middleware: Processing request for:', request.nextUrl.pathname);

  // For admin routes, we'll let the client-side handle authentication
  // since we can't access localStorage in middleware
  if (isAdminRoute) {
    console.log('Middleware: Admin route detected, allowing client-side auth check');
    return NextResponse.next();
  }

  // For login route, also allow client-side handling
  if (isLoginRoute) {
    console.log('Middleware: Login route detected, allowing client-side auth check');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login']
}; 