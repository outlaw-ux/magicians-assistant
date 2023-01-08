import Head from "next/head";
import Navigation from "../../components/Navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sign Up :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Sign Up</h1>
        <Navigation />

        <p>
          Thanks for starting, now you won&apos;t loose you place as you
          navigate the Assistant.
        </p>
      </main>
    </>
  );
}
