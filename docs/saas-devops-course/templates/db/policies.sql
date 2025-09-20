-- Configurar contexto de organización usando GUC
create or replace function set_current_org(org uuid) returns void as $$
begin
  perform set_config('app.current_org', org::text, true);
end;
$$ language plpgsql;

grant execute on function set_current_org(uuid) to app_user;

create policy org_select on organizations
  using (id = current_setting('app.current_org')::uuid);

create policy org_update on organizations
  for update using (id = current_setting('app.current_org')::uuid);

create policy user_select on users
  using (org_id = current_setting('app.current_org')::uuid);

create policy user_insert on users
  for insert with check (org_id = current_setting('app.current_org')::uuid);

create policy subs_select on subscriptions
  using (org_id = current_setting('app.current_org')::uuid);

create policy invoices_select on invoices
  using (org_id = current_setting('app.current_org')::uuid);

create policy usage_select on usage_records
  using (org_id = current_setting('app.current_org')::uuid);

create policy audit_select on audit_logs
  using (org_id = current_setting('app.current_org')::uuid);
