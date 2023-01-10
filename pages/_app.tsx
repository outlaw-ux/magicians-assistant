import { useState } from "react";
import type { AppProps } from "next/app";
import type { Session } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { SupabaseProvider } from "../context/Supabase";
import { Database } from "../utils/database.types";

function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      <SupabaseProvider>
        <Component {...pageProps} />
      </SupabaseProvider>
    </SessionContextProvider>
  );
}
export default App;
