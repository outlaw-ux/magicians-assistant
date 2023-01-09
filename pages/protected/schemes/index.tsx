import Head from "next/head";
import Navigation from "../../components/Navigation";
import CurrentScheme from "./_current";
import OngoingSchemes from "./_ongoing";

export default function SchemesPage() {
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

        <CurrentScheme />

        <OngoingSchemes />
      </main>
    </>
  );
}
