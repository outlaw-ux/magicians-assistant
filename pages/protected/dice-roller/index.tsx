import Head from "next/head";
import Navigation from "../../components/Navigation";
import DiceRollingForm from "./_form";
import DiceRollHistory from "./_history";

/**
 * @TODO
 * dN [need a good use-case for this]
 * Highlight lowest and highest in each roll (if more than two dice of same type)
 * save hand for future reroll / add (reroll) option to historical roll
 */

export default function DiceRollerPage() {
  return (
    <>
      <Head>
        <title>Dice Roller :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Dice Roller</h1>
        <Navigation />

        <DiceRollingForm />

        <DiceRollHistory />
      </main>
    </>
  );
}
