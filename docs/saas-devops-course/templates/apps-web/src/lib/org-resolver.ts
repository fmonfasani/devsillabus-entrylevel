import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');

interface Org {
  id: string;
  subdomain: string;
  custom_domain: string | null;
}

export async function getOrgByDomain(host: string, subdomain: string): Promise<Org | null> {
  const cacheKey = `org:domain:${host}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached) as Org;
  }

  const response = await fetch(`${process.env.API_URL ?? 'http://localhost:3333'}/v1/orgs/resolve?domain=${host}&subdomain=${subdomain}`);
  if (!response.ok) {
    return null;
  }

  const org = await response.json();
  await redis.set(cacheKey, JSON.stringify(org), 'EX', 60);
  return org;
}
