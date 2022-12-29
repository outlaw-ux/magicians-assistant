import Head from 'next/head';
import Image from 'next/image';
import type { Card } from 'scryfall-api';
import Navigation from '../../components/Navigation';

export async function getStaticProps() {
  const res = await fetch('https://api.scryfall.com/cards/search?q=set:sunf');
  const resData = await res.json();

  return {
    props: {
      stickerCards: resData.data,
    },
  };
}

export default function StickersPage({
  stickerCards,
}: {
  stickerCards: Card[];
}) {
  console.log('StickersPage', stickerCards);

  return (
    <>
      <Head>
        <title>Stickers :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Stickers</h1>
        <Navigation />

        <p>
          Nothing more than a list of the sticker cards for now. What else can
          we do with these?
        </p>

        {stickerCards.map((sticker) => {
          return (
            <div key={sticker.id}>
              <p>
                <strong>{sticker.name}</strong>
              </p>
              <p>
                <Image
                  src={`${sticker.image_uris?.normal}`}
                  width="300"
                  height="428"
                  alt={`${sticker.oracle_text}`}
                />
              </p>
            </div>
          );
        })}
      </main>
    </>
  );
}
