import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GameContextWrapper, SchemesContextWrapper } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextWrapper>
      <SchemesContextWrapper>
        <Component {...pageProps} />
      </SchemesContextWrapper>
    </GameContextWrapper>
  );
}
