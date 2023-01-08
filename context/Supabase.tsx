import { createClient } from "@supabase/supabase-js";
import { Provider } from "react-supabase";

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_API_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ""
);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
