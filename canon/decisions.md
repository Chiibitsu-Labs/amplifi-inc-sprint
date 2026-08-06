# canon/decisions.md — amplifi-inc-sprint

Append-only decision log for this engagement/repo (vibeOS docs/07). One paragraph per
decision: what we chose, what we rejected, why. Company-wide decisions belong in vibeOS's
own `canon/decisions.md` instead.

> **2026-08-05 — Disable Vercel Authentication for the `amplifi-inc-sprint` Vercel project.**
> The project had platform-level Vercel Authentication (SSO) enabled for all non-custom-
> domain URLs, on top of this app's own `middleware.ts` password gate. That double layer
> silently blocked anonymous access to `/onboard` — the one route deliberately exempted
> from the app's own gate — despite the app behaving as designed. Rejected leaving it on and
> routing around it via a rewrite/redirect proxy: verified that wouldn't have worked either,
> since a proxied request still hits the same platform wall underneath.
>
> **Correction (2026-08-06, Codex review on PR #10):** this entry originally claimed
> disabling was "safe because the app's own middleware still password-gates everything
> except `/access`, `/api/access`, `/onboard`" — that was wrong. The middleware matcher also
> excluded `pdfs`, `logos`, `fonts`, and the `_next/*` paths; `pdfs` holds the five real
> client deliverable PDFs, which were relying on Vercel Authentication as their *only*
> protection and were briefly left fully public by this change. Fixed in PR #11 (removed
> `pdfs` from the matcher's exclusion list). `logos`/`fonts`/`_next/*` are genuinely public
> static assets (favicon, self-hosted fonts, framework chunks) and don't need gating.
> Revisit only if a route besides `/access`, `/api/access`, `/onboard` ever needs to be
> public — Vercel Authentication would need to come back scoped, not this same
> all-or-nothing toggle.

> **2026-08-05 — Adopt the vibeOS vibecoding protocol in this repo.** Added `CLAUDE.md`,
> `product/specs/`, `product/audits/`, and this `canon/` directory, per vibeOS
> `docs/02-vibecoding-protocol.md` and `docs/07-memory-and-canon.md`'s product-repo layout
> (vibeOS attached alongside, not merged in). Applied to `site/` (this repo's own build
> process) — not to `deliverables/`, which is Amplifi's own operating system and a sprint
> deliverable in its own right, governed by its own internal rules. Not retrofitting specs
> or audit packs for already-shipped work; starting the loop from here forward.

> **2026-08-05 — Encode the Chiibitsu Labs PR review gate in this repo's `CLAUDE.md`, not
> just the vault.** The vault's `AGENTS.md` already states this rule ("Code & pull requests")
> company-wide: every PR gets an independent AI review (`@codex review` when Claude
> implements) before merge, re-requested after every fix round, requiring two consecutive
> clean passes with no Chii comment in between before an agent may self-merge. It wasn't yet
> mirrored into any product repo's own standing orders, so a session without vault access
> (or one that didn't think to check it) could merge unreviewed. Mirrored into non-negotiable
> #2 rather than only trusting future sessions to go find it.

> **2026-08-06 — Record what `amplifi_sprint_access` actually is, since nothing else does.**
> The table (see `site/lib/supabase.ts`, written from `site/app/api/access/route.ts`) is a
> write-only access log for the password/name/email gate: columns `name`, `email`,
> `user_agent`, plus Supabase's default `id`/`created_at`. RLS restricts the anon key used
> server-side to INSERT only, never SELECT. Provisioned directly via the Supabase MCP tool
> (PR #245's build), not a committed migration — CLAUDE.md non-negotiable #5 flags that gap
> as still owed. Recording the schema here so the retroactive migration has something to be
> written *from* (Codex review on PR #10 — the migration-gap note pointed here before this
> entry existed).
