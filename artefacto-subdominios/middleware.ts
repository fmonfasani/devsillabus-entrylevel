import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? ''
  const sub = host.replace('.devsyllabus.com','').split(':')[0]
  if (sub && sub !== 'www') {
    return NextResponse.rewrite(new URL(`/sites/${sub}/index.html`, req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|api|favicon.ico|assets).*)'] }