import Head from "next/head";
import { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import useAuthorizedPage from "../../../hooks/useAuthorizedPage";
import SelectToken from "./_select-token";

export default function TokensPage() {
  const { user, supabaseClient, AuthUI } = useAuthorizedPage();
  const [data, setData] = useState();

  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from("tokens").select("*");
  //     setData(data);
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData();
  // }, [user]);

  // if (!user) return AuthUI;

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

        <SelectToken tokens={data} />
      </main>
    </>
  );
}
