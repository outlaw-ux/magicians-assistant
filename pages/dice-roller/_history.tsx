import { useDiceContext } from "../../context";
import { DieType } from "../../types";

export default function DiceRollHistory() {
  const { resultsHistory, handleClearHistory } = useDiceContext();
  const reverseHistory = [...(resultsHistory || [])].reverse();

  return (
    <>
      <h2>History</h2>
      <button type="button" onClick={handleClearHistory}>
        Clear History
      </button>
      {resultsHistory?.length ? (
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
                      <strong>{die}</strong>:{" "}
                      {JSON.stringify(rolls, undefined, 1)} = <em>{total}</em>
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
      ) : (
        <p>No rolls yet.</p>
      )}
    </>
  );
}
