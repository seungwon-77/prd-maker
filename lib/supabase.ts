import "server-only";
import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL과 SUPABASE_SECRET_KEY 환경변수를 설정해 주세요.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
