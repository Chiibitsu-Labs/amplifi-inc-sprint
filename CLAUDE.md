# CLAUDE.md — amplifi-inc-sprint

The Builder's standing orders for this repo, per vibeOS's vibecoding protocol
(`chiibitsu-labs/vibeOS`, `docs/02-vibecoding-protocol.md`). Attach the vibeOS repo alongside
this one in every build session — it holds the protocol and canon; this repo holds this
engagement's specs, audits, and lessons.

## What this is

Chiibitsu Labs' delivery repo for the **Amplifi AI Incorporation Sprint** engagement. Two
things live here, and they're different layers — don't conflate them:

- **`site/`** — the client-facing Next.js deliverables site (password-gated deliverable
  pages, PDFs, and the public `/onboard` analyst self-setup page). This is the code the
  vibecoding protocol below governs.
- **`deliverables/`** — Amplifi's own operating system, itself a sprint deliverable: their
  reporting workflow, QA gates, and HIRE instrument (`deliverables/02-output-consistency/`
  skills, `05-when-to-hire-instrument/`, etc.). This is *content we built for the client*,
  not this repo's own build process — it has its own internal rules, which live in its own
  files, not in this CLAUDE.md.

Live specs: `product/specs/` (empty as of this file — the site shipped ahead of protocol
adoption; retroactive specs welcome but not required for already-shipped work).

## Stack & commands

- Stack: Next.js 15 + TypeScript, Tailwind, Supabase (access-log tracking), Vercel hosting —
  matches vibeOS's reference stack (`docs/06-bindings.md`).
- All commands run from `site/`:
  - Install: `npm install` · Dev: `npm run dev` · Build (also typechecks): `npm run build`
  - Lint: `npm run lint` — **not wired into CI or the build**; `next.config.mjs` sets
    `eslint: { ignoreDuringBuilds: true }`. Run it by hand until that's fixed (see gotchas).
  - Test: **no test suite exists yet.** Non-negotiable #2 below is aspirational until one
    does — flagged, not silently assumed.
- Deploy: Vercel, merge to main auto-deploys production; every branch gets a preview.
  `amplifi-capchecker` (sibling repo, same org) proxies `/onboard` onto
  `amplifi.chiibitsu.com` — see that repo's `next.config.mjs` and PR #12.

## Non-negotiables (vibeOS docs/02 + 04, plus the Chiibitsu Labs PR review gate below)

1. Work on a branch; never commit to main directly.
2. **Every PR gets an independent AI review before merge — always** (Chiibitsu Labs company
   rule, not vibeOS-generic: the vault's `AGENTS.md` "Code & pull requests" section, mirrored
   here so a session doesn't need vault access to know it). Whoever implemented requests the
   *other* agent: Claude-implemented → comment `@codex review` on the PR; Codex-implemented →
   request a Claude Code review. Never merge unreviewed.
   - Open the PR as **draft**, request review, address findings, request review again —
     repeat until clean. A review with findings resets the loop.
   - **First clean pass:** mark ready for review (un-draft) and request one more independent
     review.
   - **Second clean pass, with no comment from Chii in between:** the agent may merge on its
     own. Any comment from Chii pauses auto-merge — she decides from there.
3. Every feature ships with tests covering its acceptance criteria; keep the suite green.
   **Currently unenforceable — no test runner is configured.** First real feature branch
   after this file lands should also set one up (Playwright is pre-installed in this
   environment; likely the path of least resistance).
4. No secrets in code, chat, or logs — env vars only.
5. Database changes only via migrations (with rollback), never ad-hoc SQL against prod.
   **Current gap:** the access-log Supabase table (see `canon/decisions.md`) was provisioned
   directly via the Supabase MCP tool, not a committed migration file. Retroactive migration
   owed.
6. Tier 3 triggers (auth, payments, personal data, migrations, uploads, external writes):
   prepare an audit pack before requesting ship (vibeOS `templates/audit-pack.md`), and once
   findings and resolutions are filled in, commit the completed pack to
   `product/audits/<change-name>.md` before merge — not just the PR thread (doc 04).
7. Explain choices in product terms. Ask Chii product questions, not code questions.
8. End of session: commit and push this repo's changes, then write a HANDOFF note — state,
   next step, open questions, in the sub-line format vibeOS's `ops/tasks.md` defines —
   directly into the vibeOS repo's `ops/tasks.md` and commit+push that too (two repos, two
   commits — doc 07's layout). Mirror the note in the PR description for convenience, but
   the `ops/tasks.md` commit is the record.
9. This repo runs on the vibeOS protocol (Chiibitsu Labs). It isn't a vibeOS fork being
   distributed, so no NOTICE.md/attribution footer applies here — that requirement is for
   derived products, not internal client-engagement repos.

## Canon pointers

- This engagement: `canon/lessons.md`, `canon/decisions.md` (below) — retro'd judgment
  specific to `amplifi-inc-sprint`.
- Company-wide: vibeOS `canon/company.md`, `canon/voice.md`, `canon/decisions.md` — read
  when a choice here might already be settled at the company level.

## Repo-specific gotchas

<!-- The living section. Date entries; newest first. -->

- 2026-08-05 — This file, `product/`, and `canon/` didn't exist before today; the site
  (tasks completed through PR #9/#12) shipped without going through SPEC→PLAN→BUILD→
  VERIFY→AUDIT→SHIP. Not retrofitting specs for already-shipped work; starting clean from
  here forward.
- 2026-08-05 — `amplifi-inc-sprint`'s Vercel project had Vercel Authentication (platform SSO,
  separate from this app's own `middleware.ts` password gate) enabled for all non-custom-
  domain URLs, silently walling off `/onboard` from anonymous visitors despite the
  middleware's own exemption. Now disabled. If a route is ever reported as "not loading for
  someone external," check Vercel project → Settings → Deployment Protection before assuming
  the bug is in this repo's code — an authenticated fetch tool (Vercel's own, or a logged-in
  browser) will show the page fine and hide this class of bug completely.
- 2026-08-05 — Two branches (`claude/onboard-route` in this repo, `claude/inc-sprint-redirect`
  in `amplifi-capchecker`) had PRs that were already merged before new work was pushed onto
  them. Before pushing follow-up commits to a "designated" branch, check whether its PR is
  actually still open (`merged_at` populated / squash commit already on `main` are both
  reliable tells even when the tool's own `merged` boolean is stale) — an already-merged
  branch needs a fresh restart from `main`, not more commits stacked on defunct history.
- 2026-08-05 — This sandbox's own network policy blocks outbound requests to this project's
  `*.vercel.app` hosts (org egress policy, confirmed via `/root/.ccr/README.md` — not a
  Vercel setting). Anonymous end-to-end verification of a route has to happen via the user's
  own browser, or not at all from inside a session like this one.
