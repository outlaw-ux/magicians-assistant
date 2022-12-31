import Head from "next/head";
import Card from "../../components/Card";
import Navigation from "../../components/Navigation";
import stickerCards from "../../scryfall/stickers.json";

export default function StickersPage() {
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

        {stickerCards.data.map((sticker) => {
          return (
            <div key={sticker.id}>
              <p>
                <strong>{sticker.name}</strong>
              </p>
              <p>
                <Card
                  src={`${sticker.image_uris?.normal}`}
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
