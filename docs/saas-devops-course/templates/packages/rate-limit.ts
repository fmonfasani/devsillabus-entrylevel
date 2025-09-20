import Redis from 'ioredis';

type RateLimitOptions = {
  windowSeconds: number;
  maxHits: number;
  prefix?: string;
};

const redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');

export async function rateLimit(key: string, { windowSeconds, maxHits, prefix = 'ratelimit' }: RateLimitOptions) {
  const redisKey = `${prefix}:${key}`;
  const now = Math.floor(Date.now() / 1000);

  const multi = redis.multi();
  multi.zremrangebyscore(redisKey, 0, now - windowSeconds);
  multi.zadd(redisKey, now, `${now}-${Math.random()}`);
  multi.expire(redisKey, windowSeconds);
  multi.zcard(redisKey);

  const [, , , count] = await multi.exec();
  const hits = Array.isArray(count) ? Number(count[1]) : Number(count);

  return {
    success: hits <= maxHits,
    remaining: Math.max(0, maxHits - hits),
  };
}
