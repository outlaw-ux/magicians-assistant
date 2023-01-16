import React, { createContext, useContext } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Auth from "../components/Auth";

interface ISupabase {
  supabase: SupabaseClient | null;
  user: User | null;
}

const defaultContext: ISupabase = {
  user: null,
  supabase: null,
};

const SupabaseContext = createContext(defaultContext);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <SupabaseContext.Provider value={{ supabase: supabaseClient, user }}>
      {!user ? <Auth /> : children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseContext() {
  return useContext(SupabaseContext);
}
