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
> since a proxied request still hits the same platform wall underneath. Disabling it is safe
> because the app's own middleware still password-gates everything except `/access`,
> `/api/access`, `/onboard`. Revisit only if a route besides those three ever needs to be
> public — Vercel Authentication would need to come back scoped, not this same all-or-nothing
> toggle.

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
