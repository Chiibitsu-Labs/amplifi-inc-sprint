# Amplifi AI Incorporation Sprint — site

The executive record of the sprint: the home page plus one page per deliverable, each
with a downloadable PDF, gated behind a password + name/email capture so Chiibitsu Labs
can see who's viewed it. Built with the vibeOS reference stack — Next.js, TypeScript,
Tailwind, Supabase, deployed on Vercel.

## Running locally

```
npm install
npm run dev
```

Visit `http://localhost:3000` — you'll land on `/access` first. Set `ACCESS_PASSWORD` and
`SESSION_SECRET` in a `.env.local` first (see **Configuration** below) — the app throws at
startup without them.

## Configuration

`ACCESS_PASSWORD` and `SUPABASE_URL`) have safe non-secret defaults baked into
`lib/config.ts`. `ACCESS_PASSWORD` and `SESSION_SECRET` do not — the app throws at startup
if either is unset, on purpose: this is a public repo, so a hardcoded fallback password or
signing secret would be readable by anyone who opens the source. Set both as Vercel project
Environment Variables before sharing the real link:

| Variable | Default | What it's for |
|---|---|---|
| `ACCESS_PASSWORD` | none — required | The password on `/access`. |
| `SESSION_SECRET` | none — required | Signs the access-gate session cookie. Use a long random value (e.g. `openssl rand -hex 32`). |
| `SUPABASE_URL` | the Chiibitsu Labs shared Supabase project | Where visitor name/email get logged. |
| `SUPABASE_ANON_KEY` | that project's anon/publishable key | Safe to expose — the `amplifi_sprint_access` table's RLS policy only allows inserts, never reads. |

Visitor log: query `amplifi_sprint_access` (name, email, user_agent, created_at) in the
`chiibitsu-labs` Supabase project — that's "who's viewed it."

## Deploying to Vercel

This repo is ready for Vercel's standard **Import Git Repository** flow:

1. In the Vercel dashboard, New Project → Import `chiibitsu-labs/amplifi-inc-sprint`.
2. Set **Root Directory** to `site`.
3. Framework preset: Next.js (auto-detected).
4. Optionally set the env vars above; the app works without them.
5. Deploy. Every future PR against this repo gets its own preview URL automatically —
   the "instant rollback" / preview-deploy behavior vibeOS's bindings doc calls for.

(The build agent that authored this site didn't have permission to create a new Vercel
project via API in this workspace's account — hence the manual one-time import above
instead of a live preview link in the PR.)

## Structure

- `app/(site)/` — the gated pages: home, `/deliverable/[id]`, `/team` (placeholder)
- `app/access/` — the password + name/email gate
- `app/api/access/` — validates the password, logs the visitor to Supabase, sets the
  session cookie
- `middleware.ts` — redirects any unauthenticated request to `/access`
- `content/*.ts` — each page's copy, distilled from `../deliverables/*/`
- `public/pdfs/` — the five downloadable deliverable PDFs
- `public/logos/` — Chiibitsu Labs and Amplifi marks (already background-removed)
- `public/fonts/` — self-hosted Source Serif, Public Sans, IBM Plex Mono, Playfair Display

## Regenerating the PDFs

The five files in `public/pdfs/` are exported from the live `/deliverable/[id]` pages
via Playwright + headless Chromium (`page.pdf()`), not authored separately. See
[`PDF-DESIGN-STANDARD.md`](./PDF-DESIGN-STANDARD.md) before touching that pipeline —
Chromium's print engine has a few undocumented quirks (header/footer background,
margin insets, table pagination) that will reintroduce white gaps or a blank trailing
page if you don't work around them the way that doc describes.

## A note on the password gate

The password check and session cookie are server-side (`middleware.ts` +
`app/api/access/route.ts`), verified with a signed HMAC cookie — this is real access
control, not a client-side trick. What it does *not* do is protect against a
determined attacker with the password shared out of band, or brute-forcing the
password itself (no rate limiting yet). Good enough for keeping this off Google and
limiting it to people your team actually gave the password to; add rate limiting if
that ever becomes a real threat model.
