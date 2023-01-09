import Head from "next/head";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import useAuthorizedPage from "../../hooks/useAuthorizedPage";
// import { useSignIn } from "react-supabase";
// import Navigation from "../../components/Navigation";

export default function SignUpPage() {
  const { user, supabaseClient, AuthUI } = useAuthorizedPage();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("attractions").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  if (!user) return;

  return user ? (
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

        <p>user:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <p>client-side data fetching with RLS</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </>
  ) : (
    AuthUI
  );
}
