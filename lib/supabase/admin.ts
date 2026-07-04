import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Service-role client — bypasses RLS. Server-only (lead capture, cron). Never expose. */
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
