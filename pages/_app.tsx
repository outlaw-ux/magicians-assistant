import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  DiceContextWrapper,
  GameContextWrapper,
  LifeContextWrapper,
  SchemesContextWrapper,
} from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextWrapper>
      <LifeContextWrapper>
        <DiceContextWrapper>
          <SchemesContextWrapper>
            <Component {...pageProps} />
          </SchemesContextWrapper>
        </DiceContextWrapper>
      </LifeContextWrapper>
    </GameContextWrapper>
  );
}
