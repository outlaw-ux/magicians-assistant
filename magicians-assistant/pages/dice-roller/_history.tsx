import { DieType, IDiceInHand, IDiceResults } from './types';

/**
 * @TODO
 * dN
 * Highlight lowest and highest in each roll (if more than two dice of same type)
 */

const STANDARD_DICE: DieType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
const DEFAULT_DICE_IN_HAND: IDiceInHand = {};

STANDARD_DICE.forEach((die) => {
  DEFAULT_DICE_IN_HAND[die] = {};
});

export default function DiceRollHistory({
  history: { datetime, ...results },
}: {
  history: IDiceResults;
}) {
  const date = `${datetime.getFullYear()}-${
    datetime.getMonth() + 1
  }-${datetime.getDate()}`;
  const time = `${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
  let historyTotal = 0;

  return (
    <li>
      <h3>
        {date} @ {time}
      </h3>

      {Object.keys(results).map((die) => {
        const { rolls, total } = results[die as DieType];
        historyTotal += total || 0;
        if (!rolls?.length) {
          return null;
        }
        return (
          <p key={die}>
            <strong>{die}</strong>: {JSON.stringify(rolls, undefined, 1)} ={' '}
            <em>{total}</em>
          </p>
        );
      })}

      <h4>
        <strong>Total: </strong>
        {historyTotal}
      </h4>
    </li>
  );
}
