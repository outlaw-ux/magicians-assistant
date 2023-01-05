import Head from "next/head";
import Navigation from "../../components/Navigation";
import SelectToken from "./_select-token";

export default function TokensPage() {
  return (
    <>
      <Head>
        <title>Token Manager :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Token Manager</h1>
        <Navigation />
        <p>Add some tokens to your battlefield!</p>

        <SelectToken />
      </main>
    </>
  );
}
