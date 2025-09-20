import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const securityHeaders: [string, string][] = [
  ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['Referrer-Policy', 'strict-origin'],
  ['Permissions-Policy', 'fullscreen=(), geolocation=()'],
  [
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.example.com https://app.posthog.com"
  ],
];

export function withSecurityHeaders(request: NextRequest, _event: NextFetchEvent) {
  const response = NextResponse.next();
  securityHeaders.forEach(([key, value]) => response.headers.set(key, value));
  return response;
}
