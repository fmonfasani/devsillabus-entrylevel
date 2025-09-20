import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL ?? '';
if (!connectionString) {
  throw new Error('DATABASE_URL no configurado');
}

export const db = drizzle(connectionString, { schema });
