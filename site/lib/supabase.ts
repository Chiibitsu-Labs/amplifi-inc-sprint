import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

// Server-side client using the anon/publishable key. Safe: the amplifi_sprint_access
// table's RLS policy only allows anonymous INSERTs, never reads.
export function supabaseServer() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
