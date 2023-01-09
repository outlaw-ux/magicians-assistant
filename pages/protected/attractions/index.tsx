import Head from "next/head";
import { useEffect } from "react";
import { useSelect } from "react-supabase";
import Navigation from "../../components/Navigation";
import CurrentAttractions from "./_current";

export default function AttractionsPage() {
  // const [{ count, data, error, fetching }] = useSelect("attractions");

  // useEffect(() => {
  //   console.log("AttractionsPage", { count, data, error, fetching });
  // }, [count, data, error, fetching]);

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

        {/* {!fetching && data && <CurrentAttractions currentAttractions={data} />} */}
      </main>
    </>
  );
}
