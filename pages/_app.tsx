import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  DiceContextWrapper,
  GameContextWrapper,
  SchemesContextWrapper,
} from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextWrapper>
      <DiceContextWrapper>
        <SchemesContextWrapper>
          <Component {...pageProps} />
        </SchemesContextWrapper>
      </DiceContextWrapper>
    </GameContextWrapper>
  );
}
