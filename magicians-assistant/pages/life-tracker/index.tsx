import Head from 'next/head';
import Navigation from '../_navigation';

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
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          voluptatibus alias in ducimus aliquam nihil nemo, deserunt, itaque
          laborum quo at, eveniet debitis optio veritatis nostrum dolorum fugit
          distinctio eaque?
        </p>
      </main>
    </>
  );
}
