import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  AttractionsContextWrapper,
  DiceContextWrapper,
  GameContextWrapper,
  LifeContextWrapper,
  SchemesContextWrapper,
  BattlefieldContextWrapper,
} from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextWrapper>
      <BattlefieldContextWrapper>
        <AttractionsContextWrapper>
          <LifeContextWrapper>
            <DiceContextWrapper>
              <SchemesContextWrapper>
                <Component {...pageProps} />
              </SchemesContextWrapper>
            </DiceContextWrapper>
          </LifeContextWrapper>
        </AttractionsContextWrapper>
      </BattlefieldContextWrapper>
    </GameContextWrapper>
  );
}
