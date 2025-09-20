-- Inicialización de políticas RLS básicas
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'app_user') then
    create role app_user login password 'temporary';
  end if;
end$$;

create schema if not exists app;

create table if not exists app.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subdomain text unique not null,
  custom_domain text unique,
  plan text not null default 'FREE',
  created_at timestamptz default now()
);

alter table app.organizations enable row level security;

create policy tenant_select on app.organizations
  for select using (true);
