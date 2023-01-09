import { MagicLink } from "../components/MagicLinkLogin";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";

export default function useAuthorizedPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleLogin = (view: string) => {
    console.log(view);
    setLoggedIn(true);
  };

  const AuthUI = useMemo(
    () => (!user ? <MagicLink supabaseClient={supabaseClient} /> : null),
    [supabaseClient, user]
  );

  useEffect(() => {
    if (!loggedIn && user) {
      setLoggedIn(true);
    }
  }, [loggedIn, user]);

  return { supabaseClient, user, AuthUI };
}
