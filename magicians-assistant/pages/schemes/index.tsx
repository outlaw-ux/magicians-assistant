import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { Card } from 'scryfall-api';
import Navigation from '../_navigation';

const shuffle = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export async function getStaticProps() {
  const res = await fetch('https://api.scryfall.com/cards/search?q=t:scheme');
  const resData = await res.json();

  return {
    props: {
      schemeCards: shuffle(resData.data),
    },
  };
}

const alertUser = (e: any) => {
  if (!(process.env.NODE_ENV === 'development')) {
    e.preventDefault();
    e.returnValue = '';
  }
};

export default function SchemesPage({ schemeCards }: { schemeCards: Card[] }) {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState<number>(0);
  const [ongoingSchemes, setOngoingSchemes] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const currentScheme = useMemo(
    () => schemeCards[currentSchemeIndex],
    [currentSchemeIndex, schemeCards]
  );
  const imagePath = useMemo(
    () => currentScheme.image_uris?.normal,
    [currentScheme]
  );

  useLayoutEffect(() => {
    console.log({ currentScheme });
    if (
      currentScheme.type_line === 'Ongoing Scheme' &&
      !ongoingSchemes.find((scheme) => scheme.id === currentScheme.id) // make sure it's not already ongoing
    ) {
      setOngoingSchemes((schemes) => [...schemes, currentScheme]);
    }
  }, [currentScheme]);

  useEffect(() => {
    if (gameStarted) {
      window.addEventListener('beforeunload', alertUser);

      return () => {
        window.removeEventListener('beforeunload', alertUser);
      };
    }

    return () => {};
  }, [gameStarted]);

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

        <hr />

        {gameStarted ? (
          <>
            <h2>Current Scheme</h2>
            <p>
              <strong>{currentScheme.name}</strong>
            </p>
            <p>
              <Image
                src={`${imagePath}`}
                width="300"
                height="428"
                alt={`${currentScheme.oracle_text}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setCurrentSchemeIndex((schemeIdx) => (schemeIdx += 1));
              }}
              disabled={loading}
            >
              Next Card
            </button>

            <h2>Ongoing Schemes</h2>
            {ongoingSchemes.length > 0 ? (
              <ul>
                {ongoingSchemes.map((scheme) => (
                  <li key={scheme.id}>
                    <p>
                      <strong>{scheme.name}</strong>
                    </p>
                    <p>{scheme.oracle_text}</p>
                    <p>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure this scheme is ready to be abandoned?'
                            )
                          ) {
                            const filteredOngoingSchemes =
                              ongoingSchemes.filter(
                                (filteringScheme) =>
                                  scheme.id !== filteringScheme.id
                              );
                            setOngoingSchemes(filteredOngoingSchemes);
                          }
                        }}
                      >
                        Abandon
                      </button>
                    </p>
                  </li>
                ))}
              </ul>
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
            <button onClick={() => setGameStarted(true)}>Start Game</button>
          </>
        )}
      </main>
    </>
  );
}
