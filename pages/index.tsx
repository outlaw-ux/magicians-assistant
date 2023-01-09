import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Navigation from "../components/Navigation";

export default function Home() {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Magicians Assistant</h1>
        <Navigation />

        {user ? <p>Start a game</p> : <p>Signup to do anything</p>}
      </main>
    </>
  );
}
