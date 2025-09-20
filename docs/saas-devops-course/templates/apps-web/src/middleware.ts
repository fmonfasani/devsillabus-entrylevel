import { NextRequest, NextResponse } from 'next/server';
import { getOrgByDomain } from './lib/org-resolver';

const PUBLIC_HOSTNAMES = ['localhost', 'app'];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') ?? '';
  const [subdomain] = hostname.split('.');

  if (PUBLIC_HOSTNAMES.includes(subdomain) || hostname === process.env.NEXT_PUBLIC_APP_DOMAIN) {
    return NextResponse.next();
  }

  const org = await getOrgByDomain(hostname, subdomain);

  if (!org) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next({ request: { headers: req.headers } });
  response.headers.set('x-org-id', org.id);
  response.cookies.set('org_id', org.id, { httpOnly: true, sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api/health|static|.*\\.\w+$).*)'],
};
