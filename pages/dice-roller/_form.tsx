import { useCallback } from "react";
import { DEFAULT_DICE_IN_HAND, STANDARD_DICE } from "../../constants";
import type { DieType, IDiceForm } from "../../types";

export default function DiceRollingForm({
  diceInHand,
  pickUpDice,
  onRoll,
}: IDiceForm) {
  const handlePickUpDice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const amount = Number(event.target.value);
      const sides = event.target.name as DieType;

      pickUpDice((dice) => ({
        ...dice,
        [sides]: {
          amount,
        },
      }));
    },
    [pickUpDice]
  );

  const handleEmptyHand = () => {
    pickUpDice(DEFAULT_DICE_IN_HAND);
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

      <button type="button" onClick={onRoll}>
        Roll
      </button>
      <button type="button" onClick={handleEmptyHand}>
        Clear Dice
      </button>
    </div>
  );
}
