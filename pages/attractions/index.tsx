import Head from "next/head";
import type { Card as CardType } from "scryfall-api";
import Card from "../../components/Card";
import Navigation from "../../components/Navigation";

export async function getStaticProps() {
  const res = await fetch(
    "https://api.scryfall.com/cards/search?q=set:unf%20type:artifact%20type:attraction"
  );
  const resData = await res.json();

  return {
    props: {
      attractionCards: resData.data,
    },
  };
}

export default function AttractionsPage({
  attractionCards,
}: {
  attractionCards: CardType[];
}) {
  console.log(attractionCards);
  return (
    <>
      <Head>
        <title>Unfinity Attractions :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Unfinity Attractions</h1>
        <Navigation />

        <p>
          Nothing more than a list of the attraction cards for now. What else
          can we do with these?
        </p>

        {attractionCards.map((attraction) => {
          return (
            <div key={attraction.id}>
              <p>
                <strong>{attraction.name}</strong>
              </p>
              <p>
                <Card
                  src={`${attraction.image_uris?.normal}`}
                  alt={`${attraction.oracle_text}`}
                />
              </p>
            </div>
          );
        })}
      </main>
    </>
  );
}
