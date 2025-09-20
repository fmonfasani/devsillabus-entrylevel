create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subdomain citext unique not null,
  custom_domain text unique,
  plan text not null default 'FREE',
  stripe_customer_id text,
  mercado_pago_customer_id text,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  email citext not null,
  name text,
  avatar_url text,
  role text not null default 'member',
  created_at timestamptz default now()
);

create table if not exists permissions (
  id serial primary key,
  role text not null,
  scope text not null
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id),
  provider text not null,
  provider_subscription_id text not null,
  plan text not null,
  status text not null,
  current_period_end timestamptz,
  trial_end timestamptz,
  created_at timestamptz default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id),
  provider text not null,
  provider_invoice_id text not null,
  amount decimal(10,2) not null,
  currency text not null,
  status text not null,
  hosted_invoice_url text,
  created_at timestamptz default now()
);

create table if not exists usage_records (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id),
  metric text not null,
  quantity integer not null,
  recorded_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id),
  actor_id uuid references users(id),
  action text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

alter table organizations enable row level security;
alter table users enable row level security;
alter table subscriptions enable row level security;
alter table invoices enable row level security;
alter table usage_records enable row level security;
alter table audit_logs enable row level security;
