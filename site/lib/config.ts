// Non-secret defaults so the site works out of the box on a fresh deploy.
// Override any of these in the Vercel project's Environment Variables before
// sharing the real link — see site/README.md.

export const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD || "MoreHuman-ByDesign-2026";

// Used to sign the access-gate session cookie. Safe to leave as-is for a low-stakes
// internal gate; set SESSION_SECRET in Vercel for a project-specific value.
export const SESSION_SECRET =
  process.env.SESSION_SECRET || "amplifi-sprint-2026-chiibitsu-labs-default-session-secret";

// Supabase anon/publishable key — designed to be public; access is enforced by the
// insert-only RLS policy on amplifi_sprint_access, not by keeping this value secret.
export const SUPABASE_URL = process.env.SUPABASE_URL || "https://wguhmblrcfcvbheusizt.supabase.co";
export const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndndWhtYmxyY2ZjdmJoZXVzaXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDM0OTcsImV4cCI6MjA5NjkxOTQ5N30.WCh8U98usiH3TPQ_rYlq1QexDvsIJsEByfjGIARMk9g";

export const SESSION_COOKIE = "amplifi_sprint_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days
