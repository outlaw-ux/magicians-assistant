import React, { createContext, useCallback, useContext, useState } from "react";
import { roll } from "../utils";
import { DEFAULT_DICE_IN_HAND } from "../constants";
import { IDiceInHand, IDiceResults, DieType, IDice } from "../types";

interface IDiceContext {
  totalDiceRoll: number;
  setTotalDiceRoll: React.Dispatch<React.SetStateAction<number>>;
  diceInHand: IDiceInHand;
  setDiceInHand: React.Dispatch<React.SetStateAction<IDiceInHand>>;
  resultsHistory?: IDiceResults[];
  setResultsHistory: React.Dispatch<
    React.SetStateAction<IDiceResults[] | undefined>
  >;
  handleClearHistory: () => void;
  handleDiceRoll: () => void;
}

const defaultContext: IDiceContext = {
  totalDiceRoll: 0,
  setTotalDiceRoll: () => {},
  diceInHand: {},
  setDiceInHand: () => {},
  resultsHistory: [],
  setResultsHistory: () => {},
  handleClearHistory: () => {},
  handleDiceRoll: () => {},
};

const DiceContext = createContext(defaultContext);

export function DiceContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalDiceRoll, setTotalDiceRoll] = useState(0);
  const [diceInHand, setDiceInHand] =
    useState<IDiceInHand>(DEFAULT_DICE_IN_HAND);
  const [resultsHistory, setResultsHistory] = useState<IDiceResults[]>();

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

      const sides = Number(die.replace("d", ""));
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

  const sharedState = {
    ...defaultContext,
    totalDiceRoll,
    setTotalDiceRoll,
    diceInHand,
    setDiceInHand,
    handleClearHistory,
    handleDiceRoll,
    resultsHistory,
    setResultsHistory,
  };

  return (
    <DiceContext.Provider value={sharedState}>{children}</DiceContext.Provider>
  );
}

export function useDiceContext() {
  return useContext(DiceContext);
}
