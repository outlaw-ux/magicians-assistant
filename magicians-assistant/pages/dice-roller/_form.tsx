import { STANDARD_DICE } from './helpers';
import type { IDiceForm } from './types';

export default function DiceRollingForm({
  diceInHand,
  pickUpDice,
  onRoll,
  onClear,
}: IDiceForm) {
  return (
    <div>
      {STANDARD_DICE.map((die) => {
        return (
          <p key={die}>
            <input
              type="number"
              name={die}
              value={`${diceInHand[die]?.amount || 0}`}
              min="0"
              max="10"
              onChange={pickUpDice}
            />
            <strong>{die}</strong>
          </p>
        );
      })}

      <button type="button" onClick={onRoll}>
        Roll
      </button>
      <button type="button" onClick={onClear}>
        Clear Dice
      </button>
    </div>
  );
}
