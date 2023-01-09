import Head from "next/head";
import Navigation from "../../components/Navigation";
import LifeForm from "./_form";

export default function LifeTrackerPage() {
  return (
    <>
      <Head>
        <title>Life Tracker :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Life Tracker</h1>
        <Navigation />
        <LifeForm />
      </main>
    </>
  );
}
