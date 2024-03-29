import { useState } from "react";
import type { AppProps } from "next/app";
import type { Session } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../supabase/functions/_shared/database.types";
import {
  CardsProvider,
  DeckProvider,
  FriendsProvider,
  SupabaseProvider,
  ProfileProvider,
  GameProvider,
} from "../context";

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
        <ProfileProvider>
          <GameProvider>
            <CardsProvider>
              <DeckProvider>
                <FriendsProvider>
                  <Component {...pageProps} />
                </FriendsProvider>
              </DeckProvider>
            </CardsProvider>
          </GameProvider>
        </ProfileProvider>
      </SupabaseProvider>
    </SessionContextProvider>
  );
}
export default App;
