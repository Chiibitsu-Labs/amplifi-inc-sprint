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

Visit `http://localhost:3000` — you'll land on `/access` first. The default password is
`MoreHuman-ByDesign-2026` (see **Configuration** below to change it).

## Configuration

Everything in `lib/config.ts` has a working default, so the site runs out of the box.
Override any of these as Vercel project Environment Variables before sharing the real
link:

| Variable | Default | What it's for |
|---|---|---|
| `ACCESS_PASSWORD` | `MoreHuman-ByDesign-2026` | The password on `/access`. Change this before wide distribution. |
| `SESSION_SECRET` | a fixed placeholder string | Signs the access-gate session cookie. Set a real random value in production. |
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

## A note on the password gate

The password check and session cookie are server-side (`middleware.ts` +
`app/api/access/route.ts`), verified with a signed HMAC cookie — this is real access
control, not a client-side trick. What it does *not* do is protect against a
determined attacker with the password shared out of band, or brute-forcing the
password itself (no rate limiting yet). Good enough for keeping this off Google and
limiting it to people your team actually gave the password to; add rate limiting if
that ever becomes a real threat model.
