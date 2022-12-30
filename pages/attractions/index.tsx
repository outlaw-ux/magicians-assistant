import Head from "next/head";
import Navigation from "../../components/Navigation";
import CurrentAttractions from "./_current";

export default function AttractionsPage() {
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

        <CurrentAttractions />
      </main>
    </>
  );
}
