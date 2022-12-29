import { useCallback } from "react";
import { DEFAULT_DICE_IN_HAND, STANDARD_DICE } from "../../constants";
import { useDiceContext } from "../../context";

export default function DiceRollingForm() {
  const { diceInHand, setDiceInHand, handleDiceRoll, totalDiceRoll } =
    useDiceContext();
  const handlePickUpDice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const amount = Number(event.target.value);
      const sides = event.target.name;

      setDiceInHand((dice) => ({
        ...dice,
        [sides]: {
          amount,
        },
      }));
    },
    [setDiceInHand]
  );

  const handleEmptyHand = () => {
    setDiceInHand(DEFAULT_DICE_IN_HAND);
  };

  return (
    <div>
      {STANDARD_DICE.map((die) => {
        const value = `${diceInHand?.[die]?.amount || 0}`;
        return (
          <p key={die}>
            <input
              type="number"
              name={die}
              value={value}
              min="0"
              max="10"
              onChange={handlePickUpDice}
            />
            <strong>{die}</strong>
          </p>
        );
      })}

      <button type="button" onClick={handleDiceRoll}>
        Roll
      </button>
      <button type="button" onClick={handleEmptyHand}>
        Clear Dice
      </button>

      <h2>Total: {totalDiceRoll}</h2>
    </div>
  );
}
