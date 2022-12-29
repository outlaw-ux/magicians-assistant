import Head from "next/head";
import { useGameContext } from "../context";

export default function StartGame() {
  const { toggleGameStart } = useGameContext();
  return (
    <>
      <Head>
        <title>Start New Game :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Start Game?</h2>
      <p>Nothing to do until you deal your hand and start a new game.</p>
      <button onClick={toggleGameStart}>Start Game</button>
    </>
  );
}
