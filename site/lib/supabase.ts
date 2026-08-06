import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } from "./config";

// Uses the service-role key (bypasses RLS) when it's configured in Vercel, so the write
// doesn't depend on anon's INSERT grant on amplifi_sprint_access — that grant is spoofable
// by anyone holding the public anon key (see canon/decisions.md). Falls back to the anon
// key otherwise, matching this project's behavior before SUPABASE_SERVICE_ROLE_KEY existed.
export function supabaseServer() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
