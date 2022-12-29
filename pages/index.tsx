import Head from "next/head";
import Navigation from "../components/Navigation";
import { useGameContext } from "../context/Game";

export default function Home() {
  const { gameStarted, toggleGameStart } = useGameContext();
  return (
    <>
      <Head>
        <title>Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Magicians Assistant</h1>
        <Navigation />

        {gameStarted ? (
          <p>
            Thanks for starting, now you won&apos;t loose you place as you
            navigate the Assistant.
          </p>
        ) : (
          <p>Not much to do around here until you start a new game.</p>
        )}

        <button onClick={toggleGameStart}>
          {gameStarted ? "End" : "Start"} Game
        </button>
      </main>
    </>
  );
}
