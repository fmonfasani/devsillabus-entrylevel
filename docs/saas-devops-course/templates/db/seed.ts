import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { organizations, users, subscriptions, permissions } from './schema';

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function seed() {
  await client.connect();
  const db = drizzle(client);

  await db.insert(organizations).values([
    { id: '11111111-1111-1111-1111-111111111111', name: 'Acme Inc', subdomain: 'acme', plan: 'PRO' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Globex', subdomain: 'globex', plan: 'FREE' }
  ]).onConflictDoNothing();

  await db.insert(users).values([
    { id: '33333333-3333-3333-3333-333333333333', orgId: '11111111-1111-1111-1111-111111111111', email: 'owner@acme.dev', role: 'owner', name: 'Owner Acme' },
    { id: '44444444-4444-4444-4444-444444444444', orgId: '22222222-2222-2222-2222-222222222222', email: 'admin@globex.dev', role: 'admin', name: 'Admin Globex' }
  ]).onConflictDoNothing();

  await db.insert(permissions).values([
    { role: 'owner', scope: 'billing:write' },
    { role: 'owner', scope: 'users:manage' },
    { role: 'admin', scope: 'users:read' },
    { role: 'support', scope: 'org:impersonate' }
  ]).onConflictDoNothing();

  await db.insert(subscriptions).values({
    id: '55555555-5555-5555-5555-555555555555',
    orgId: '11111111-1111-1111-1111-111111111111',
    provider: 'stripe',
    providerSubscriptionId: 'sub_123',
    plan: 'PRO',
    status: 'active'
  }).onConflictDoNothing();

  console.log('Seed completado');
  await client.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
