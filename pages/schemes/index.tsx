import Head from "next/head";
import { useLayoutEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useGameContext, useSchemesContext } from "../../context";
import CurrentScheme from "./_current";
import OngoingSchemes from "./_ongoing";

export default function SchemesPage() {
  const { gameStarted, toggleGameStart } = useGameContext();
  const {
    ongoingSchemes,
    currentScheme,
    setCurrentSchemeIndex,
    setOngoingSchemes,
    schemeCards,
  } = useSchemesContext();
  const [disabledNextButton, setDisabledNextButton] = useState(true);

  const handleNextSchemeClick = () => {
    setDisabledNextButton(true);
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
      currentScheme?.type_line === "Ongoing Scheme" &&
      !ongoingSchemes.find((scheme) => scheme.id === currentScheme.id) // make sure it's not already ongoing
    ) {
      setOngoingSchemes((schemes) => [...schemes, currentScheme]);
    }
  }, [currentScheme, gameStarted, ongoingSchemes, setOngoingSchemes]);

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
                onLoad={() =>
                  setTimeout(() => {
                    setDisabledNextButton(false);
                  }, 500)
                }
              />
            )}

            <button
              onClick={handleNextSchemeClick}
              disabled={disabledNextButton}>
              Draw Next Scheme
            </button>

            <h2>Ongoing Schemes</h2>
            {ongoingSchemes.length > 0 ? <OngoingSchemes /> : <p>None.</p>}
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
