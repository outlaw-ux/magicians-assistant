// import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import type { Session } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
// import {
//   DecksContextWrapper,
//   DiceContextWrapper,
//   GameContextWrapper,
//   LifeContextWrapper,
//   SchemesContextWrapper,
//   BattlefieldContextWrapper,
// } from "../context";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      {/* <GameContextWrapper>
        <BattlefieldContextWrapper>
          <DecksContextWrapper>
            <LifeContextWrapper>
              <DiceContextWrapper>
                <SchemesContextWrapper> */}
      <Component {...pageProps} />
      {/* </SchemesContextWrapper>
              </DiceContextWrapper>
            </LifeContextWrapper>
          </DecksContextWrapper>
        </BattlefieldContextWrapper>
      </GameContextWrapper> */}
    </SessionContextProvider>
  );
}
