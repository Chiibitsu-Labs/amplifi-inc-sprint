// SUPABASE_URL/SUPABASE_ANON_KEY below have safe non-secret defaults (see comment there).
// ACCESS_PASSWORD/SESSION_SECRET do not — they must be set as Vercel project Environment
// Variables before the real link is shared. See site/README.md.

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Set it in the Vercel project's Environment Variables — see site/README.md.`
    );
  }
  return value;
}

// Functions, not constants: evaluated lazily per-request rather than at module import,
// so a missing env var fails an actual /access request, not `next build` itself — Next
// statically imports route modules while collecting page data, before any request runs.
export function getAccessPassword(): string {
  return requireEnv("ACCESS_PASSWORD");
}

// Used to sign the access-gate session cookie.
export function getSessionSecret(): string {
  return requireEnv("SESSION_SECRET");
}

// Supabase anon/publishable key — designed to be public. On its own it lets anyone holding
// it insert fabricated rows into amplifi_sprint_access (see SUPABASE_SERVICE_ROLE_KEY below
// and canon/decisions.md) — safe to expose, but not sufficient by itself to trust the log's
// contents.
export const SUPABASE_URL = process.env.SUPABASE_URL || "https://wguhmblrcfcvbheusizt.supabase.co";
export const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndndWhtYmxyY2ZjdmJoZXVzaXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDM0OTcsImV4cCI6MjA5NjkxOTQ5N30.WCh8U98usiH3TPQ_rYlq1QexDvsIJsEByfjGIARMk9g";

// Optional on purpose, unlike ACCESS_PASSWORD/SESSION_SECRET: not yet set in Vercel as of
// this commit. site/lib/supabase.ts uses it when present (bypasses RLS for the access-log
// write) and falls back to the anon key when absent, so this ships with no behavior change
// until the var is set — see canon/decisions.md for what setting it unblocks.
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const SESSION_COOKIE = "amplifi_sprint_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days
