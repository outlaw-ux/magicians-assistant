import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GameContextWrapper } from "../context/Game";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextWrapper>
      <Component {...pageProps} />
    </GameContextWrapper>
  );
}
