import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  subdomain: text('subdomain').notNull(),
  plan: text('plan').default('FREE'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  orgId: uuid('org_id').notNull(),
  email: text('email').notNull(),
  role: text('role').default('member'),
});
