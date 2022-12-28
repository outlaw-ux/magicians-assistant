import Head from 'next/head';
import Navigation from './_navigation';

export default function Home() {
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
      </main>
    </>
  );
}
