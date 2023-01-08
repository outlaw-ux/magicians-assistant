import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  DecksContextWrapper,
  DiceContextWrapper,
  GameContextWrapper,
  LifeContextWrapper,
  SchemesContextWrapper,
  BattlefieldContextWrapper,
  SupabaseProvider,
} from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SupabaseProvider>
      <GameContextWrapper>
        <BattlefieldContextWrapper>
          <DecksContextWrapper>
            <LifeContextWrapper>
              <DiceContextWrapper>
                <SchemesContextWrapper>
                  <Component {...pageProps} />
                </SchemesContextWrapper>
              </DiceContextWrapper>
            </LifeContextWrapper>
          </DecksContextWrapper>
        </BattlefieldContextWrapper>
      </GameContextWrapper>
    </SupabaseProvider>
  );
}
