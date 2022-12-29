import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import Navigation from '../../components/Navigation';
import { STANDARD_DICE } from './helpers';
import { roll } from '../../utils';
import { DieType, IDice, IDiceInHand, IDiceResults } from './types';
import DiceRollingForm from './_form';
import DiceRollHistory from './_history';

/**
 * @TODO
 * dN
 * Highlight lowest and highest in each roll (if more than two dice of same type)
 */

const DEFAULT_DICE_IN_HAND: IDiceInHand = {};

STANDARD_DICE.forEach((die) => {
  DEFAULT_DICE_IN_HAND[die] = {};
});

export default function DiceRollerPage() {
  const [totalDiceRoll, setTotalDiceRoll] = useState(0);
  const [diceInHand, setDiceInHand] =
    useState<IDiceInHand>(DEFAULT_DICE_IN_HAND);
  const [resultsHistory, setResultsHistory] = useState<IDiceResults[]>();
  const handlePickUpDice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiceInHand((dice) => ({
      ...dice,
      [event.target.name]: {
        ...(dice?.[event.target.name as DieType] || {}),
        amount: Number(event.target.value),
      },
    }));
  };
  const handleEmptyHand = () => {
    setDiceInHand(DEFAULT_DICE_IN_HAND);
  };
  const handleClearHistory = () => {
    setResultsHistory(undefined);
  };

  const handleDiceRoll = useCallback(() => {
    const history: IDiceResults = {
      datetime: new Date(),
    };
    let total = 0;

    Object.keys(diceInHand).forEach((die) => {
      const rollResults: IDice = {
        amount: 0,
        rolls: [],
        total: 0,
      };

      const sides = Number(die.replace('d', ''));
      rollResults.amount = Number(diceInHand[die as DieType].amount) || 0;

      for (let index = 0; index < rollResults.amount; index++) {
        rollResults.rolls?.push(roll(sides));
      }

      rollResults.total = rollResults.rolls?.length
        ? rollResults.rolls?.reduce((a, b) => a + b)
        : 0;

      history[die as DieType] = rollResults;
      total += rollResults.total;
    });

    setTotalDiceRoll(total);
    setResultsHistory((results) => {
      if (!results?.find((result) => result.datetime === history.datetime)) {
        const output = results || [];
        output.push(history);
        return output;
      }

      return results;
    });
  }, [diceInHand]);

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

        <DiceRollingForm
          diceInHand={diceInHand}
          pickUpDice={handlePickUpDice}
          onRoll={handleDiceRoll}
          onClear={handleEmptyHand}
        />

        <h2>Total: {totalDiceRoll}</h2>

        <h2>History</h2>
        <button type="button" onClick={handleClearHistory}>
          Clear History
        </button>
        {resultsHistory?.length ? (
          <ol>
            {resultsHistory?.reverse().map((history) => (
              <DiceRollHistory
                history={history}
                key={history.datetime.toUTCString()}
              />
            ))}
          </ol>
        ) : (
          <p>No rolls yet.</p>
        )}
      </main>
    </>
  );
}
