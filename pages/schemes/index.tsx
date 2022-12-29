import Head from "next/head";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { Card } from "scryfall-api";
import Navigation from "../../components/Navigation";
import { useGameContext } from "../../context/Game";
import useConfirmExit from "../../hooks/useConfirmExit";
import { shuffle } from "../../utils";
import CurrentScheme from "./_current";
import OngoingSchemes from "./_ongoing";

export async function getStaticProps() {
  const res = await fetch("https://api.scryfall.com/cards/search?q=t:scheme");
  const resData = await res.json();

  return {
    props: {
      schemeCards: shuffle(resData.data),
    },
  };
}

export default function SchemesPage({ schemeCards }: { schemeCards: Card[] }) {
  const { gameStarted, toggleGameStart } = useGameContext();
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState<number>(0);
  const [ongoingSchemes, setOngoingSchemes] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setNeedConfirm } = useConfirmExit();
  const currentScheme = useMemo(
    () => schemeCards[currentSchemeIndex],
    [currentSchemeIndex, schemeCards]
  );

  const handleNextSchemeClick = () => {
    setLoading(true);
    setCurrentSchemeIndex((schemeIdx: number) => {
      const maxIdx = schemeCards.length - 1;
      const nextIdx = schemeIdx + 1;

      if (nextIdx >= maxIdx) {
        return schemeIdx;
      }

      return nextIdx;
    });
  };

  useLayoutEffect(() => {
    if (
      gameStarted &&
      currentScheme.type_line === "Ongoing Scheme" &&
      !ongoingSchemes.find((scheme) => scheme.id === currentScheme.id) // make sure it's not already ongoing
    ) {
      setOngoingSchemes((schemes) => [...schemes, currentScheme]);
    }
  }, [currentScheme, currentSchemeIndex, gameStarted, ongoingSchemes]);

  useEffect(() => {
    setNeedConfirm(gameStarted);

    return () => {};
  }, [gameStarted, setNeedConfirm]);

  return (
    <>
      <Head>
        <title>Schemes :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Schemes</h1>
        <Navigation />
        {gameStarted ? (
          <>
            <h2>Current Scheme</h2>
            {currentScheme && (
              <CurrentScheme
                scheme={currentScheme}
                onLoad={() => setLoading(false)}
              />
            )}

            <button onClick={handleNextSchemeClick} disabled={loading}>
              Draw Next Scheme
            </button>

            <h2>Ongoing Schemes</h2>
            {ongoingSchemes.length > 0 ? (
              <OngoingSchemes
                schemes={ongoingSchemes}
                setSchemes={setOngoingSchemes}
              />
            ) : (
              <p>None.</p>
            )}
          </>
        ) : (
          <>
            <h2>Start Game?</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
              voluptatibus alias in ducimus aliquam nihil nemo, deserunt, itaque
              laborum quo at, eveniet debitis optio veritatis nostrum dolorum
              fugit distinctio eaque?
            </p>
            <button onClick={toggleGameStart}>Start Game</button>
          </>
        )}
      </main>
    </>
  );
}
