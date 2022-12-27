import Head from 'next/head'
import { useState } from 'react';
import Card from '../../components/Card';
import Navigation from '../_navigation';
import OngoingSchemes from './OngoingSchemes';

// function requestListener() {
//   const parsedData = JSON.parse(this.responseText);

//   actionButton.textContent = "Start Game";
//   actionButton.disabled = false;
//   actionButton.onclick = () => {
//     actionButton.disabled = true;
//     actionButton.textContent = "Draw Next Scheme";
//     startGame(parsedData);
//   };
// }

export async function getStaticProps() {


    const res = await fetch('https://api.scryfall.com/cards/search?q=t:scheme')
  const schemeCards = await res.json()

  return {
    props: {
      schemeCards
    }, // will be passed to the page component as props
  }
}




export default function SchemesPage({schemeCards}) {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      <Head>
        <title>Schemes :: Magician's Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
        Schemes
        </h1>
        <Navigation />

        <hr />

{gameStarted ? (<>
<Card />
<button>Next Card</button>
<OngoingSchemes />
</>) : (<>
    <h2>Start Game?</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit voluptatibus alias in ducimus aliquam nihil nemo, deserunt, itaque laborum quo at, eveniet debitis optio veritatis nostrum dolorum fugit distinctio eaque?</p>
          <button onClick={() => setGameStarted(true)}>Start Game</button>
  </>)}


      </main>
    </>
  )
}
