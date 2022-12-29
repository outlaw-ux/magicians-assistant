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
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
        voluptatibus alias in ducimus aliquam nihil nemo, deserunt, itaque
        laborum quo at, eveniet debitis optio veritatis nostrum dolorum fugit
        distinctio eaque?
      </p>
      <button onClick={toggleGameStart}>Start Game</button>
    </>
  );
}
