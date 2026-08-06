-- Retroactive migration file for a change already applied to the live `chiibitsu-labs`
-- Supabase project (wguhmblrcfcvbheusizt) via the Supabase MCP tool on 2026-07-20
-- (schema_migrations version 20260720054855, name create_amplifi_sprint_access) — this file
-- didn't exist in the repo until now. The version in the filename matches that existing
-- Supabase-side migration record exactly, so this is a record of what already ran, not a new
-- change to apply. See canon/decisions.md for full provenance and the follow-up
-- (SUPABASE_SERVICE_ROLE_KEY / anon-spoofing) this table's access model still owes.

create table public.amplifi_sprint_access (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

comment on table public.amplifi_sprint_access is
  'Visitor log for the Amplifi AI Incorporation Sprint site access gate (name/email captured on password entry).';

alter table public.amplifi_sprint_access enable row level security;

create policy "anon can log access"
  on public.amplifi_sprint_access
  for insert
  to anon
  with check (true);

-- Explicit, even though this project's anon/authenticated/service_role roles already carry
-- it via Supabase's default schema-wide grant (`GRANT ALL ON ALL TABLES IN SCHEMA public TO
-- anon, authenticated, service_role`, applied automatically, not a per-table grant set here).
-- RLS restricts rows; it never substitutes for the base table privilege a role needs before
-- RLS is even evaluated. Recreating just the table + policy above in an environment without
-- that schema-wide default (any non-Supabase-provisioned Postgres) would let anon attempt
-- inserts that fail at the privilege check, and site/app/api/access/route.ts swallows that
-- failure while still admitting the visitor — so the log would go silently empty with no
-- user-visible symptom.
grant insert on public.amplifi_sprint_access to anon;

-- ROLLBACK (CLAUDE.md non-negotiable #5 requires one; the Supabase CLI has no native
-- down-migration mechanism, so this is the reviewed procedure to run by hand if this table
-- is ever reverted). Irreversibly deletes any logged visitor rows — confirm that's actually
-- intended before running.
--
-- revoke insert on public.amplifi_sprint_access from anon;
-- drop policy if exists "anon can log access" on public.amplifi_sprint_access;
-- alter table public.amplifi_sprint_access disable row level security;
-- drop table public.amplifi_sprint_access;
