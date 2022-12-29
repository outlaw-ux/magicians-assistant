import { DieType, IDiceResults } from "../../types";

export default function DiceRollHistory({
  resultsHistory = [],
}: {
  resultsHistory: IDiceResults[];
}) {
  const reverseHistory = [...resultsHistory].reverse();

  return (
    <ol>
      {reverseHistory.map((history) => {
        const { datetime, ...results } = history;
        const date = `${datetime.getFullYear()}-${
          datetime.getMonth() + 1
        }-${datetime.getDate()}`;
        const time = `${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
        let historyTotal = 0;

        return (
          <li key={datetime.toUTCString()}>
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
                  <strong>{die}</strong>: {JSON.stringify(rolls, undefined, 1)}{" "}
                  = <em>{total}</em>
                </p>
              );
            })}

            <h4>
              <strong>Total: </strong>
              {historyTotal}
            </h4>
          </li>
        );
      })}
    </ol>
  );
}
