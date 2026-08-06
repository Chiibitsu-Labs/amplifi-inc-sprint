# Audit Pack: Retroactive migration + service-role write path (PR #13)

> Prepared per vibeOS `docs/04-audit-protocol.md`, Tier 3 — this change touches a database
> migration, personal-data access logging, and the credential used for an external write, all
> three explicit triggers. **Substitution note, stated plainly rather than silently:** this
> engagement has no separate Auditor binding beyond the Chiibitsu Labs company-wide PR review
> gate (`AGENTS.md`), which already routes every PR through Codex — a different vendor's model
> from the Claude session that wrote this change, satisfying doc 04's cross-vendor requirement
> in substance. The findings below are Codex's actual review of this diff via that gate, not
> a separately-staged audit session — this pack documents that real review, it doesn't
> fabricate a second one.

## 1. What this change is

Two related fixes to `amplifi_sprint_access` (the Supabase table logging name/email/user-agent
for everyone who passes the site's password gate), both requested by Chii after being flagged
as open gaps in `canon/decisions.md`:

- A retroactive migration file for the table, which previously existed only as a live Supabase
  object provisioned via the Supabase MCP tool — no committed migration reflected it.
- A code-level mitigation for anon-key spoofing: the app's write to this table can now use a
  `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS) instead of the public anon key, once Chii sets
  that var in Vercel. Until she does, behavior is unchanged from before this PR.

## 2. Builder's own risk statement

Least sure about: whether "ships with zero behavior change until the var is set" is actually
airtight, versus whether Codex or a closer read would find an edge case in the `||` fallback.
(It didn't — see findings below, none touched this specific claim.) What I'd attack first as
the auditor: whether the migration's rollback is real and correct, and whether the README's
claim about what `SUPABASE_SERVICE_ROLE_KEY` accomplishes overpromises before the anon grant
is actually revoked. Shortcut taken, disclosed rather than hidden: the anon INSERT grant/policy
on the live table is deliberately *not* touched in this PR — revoking it before
`SUPABASE_SERVICE_ROLE_KEY` is confirmed live would risk the log going dark with no code change
to blame it on.

## 3. Data & permissions context

`amplifi_sprint_access` holds name, email, user-agent, and timestamp for every successful
password-gate entry — personal data, low sensitivity (visitors already gave Chiibitsu Labs
their contact info by using the password shared with them), but still real PII. Current
readers: `service_role` only (Supabase dashboard access), no app code ever reads it. Current
writers: `anon` (via RLS policy + explicit grant, both retained by this migration) and, once
`SUPABASE_SERVICE_ROLE_KEY` is set, `service_role` via the app's own write path. The
service-role key itself, once set, is read only server-side (`site/app/api/access/route.ts` →
`site/lib/supabase.ts`) and is never sent to the client.

## 4. The diff

Frozen as of commit `4444215` (the reviewed commit) plus this round's fix commit addressing
the findings below — `site/lib/config.ts`, `site/lib/supabase.ts`, `site/README.md`,
`CLAUDE.md`, and the new `site/supabase/migrations/20260720054855_create_amplifi_sprint_access.sql`
(reproduced here in full since it's a new file, not a diff):

```sql
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

grant insert on public.amplifi_sprint_access to anon;

-- ROLLBACK (run by hand if this table is ever reverted; deletes logged visitor rows):
-- revoke insert on public.amplifi_sprint_access from anon;
-- drop policy if exists "anon can log access" on public.amplifi_sprint_access;
-- alter table public.amplifi_sprint_access disable row level security;
-- drop table public.amplifi_sprint_access;
```

```diff
--- a/site/lib/config.ts
+++ b/site/lib/config.ts
+export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

--- a/site/lib/supabase.ts
+++ b/site/lib/supabase.ts
 export function supabaseServer() {
-  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
+  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY, {
     auth: { persistSession: false },
   });
 }
```

No secrets appear in this diff — `SUPABASE_SERVICE_ROLE_KEY` is read from `process.env` only,
never a literal value; the anon key already public in `site/lib/config.ts` predates this PR.

---

## Findings & resolutions

| # | Severity | Finding (one line) | Resolution |
|---|---|---|---|
| 1 | HIGH | Migration had no paired rollback despite CLAUDE.md non-negotiable #5 requiring one, and the original commit unilaterally waived the rule instead of following it. | **FIXED** — added a commented rollback block to the migration file (Supabase CLI has no native down-migration mechanism, so this is the reviewed manual procedure) and corrected CLAUDE.md's non-negotiable #5 note to stop claiming none exists. |
| 2 | HIGH | This PR shipped without the Tier 3 audit pack CLAUDE.md non-negotiable #6 and `product/audits/README.md` require for a change touching a migration, personal-data logging, and an external-write credential. | **FIXED** — this file. |
| 3 | MEDIUM | `site/README.md` described setting `SUPABASE_SERVICE_ROLE_KEY` as "closing the anon-spoofing gap," but the anon INSERT grant/policy is still live in this same PR — an operator could read that and stop after step 1, trusting a still-forgeable log. | **FIXED** — reworded to "preparatory only," explicit that the gap stays open until the anon grant is separately revoked. |

**Founder verdict on disputes:** none — all three findings were accepted and fixed as described.
