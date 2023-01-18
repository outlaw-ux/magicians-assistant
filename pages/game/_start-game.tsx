import React, { useCallback, useState } from "react";
import { useFriendsContext, useGameContext } from "../../context";

const variantMinPlayerCount = {
  none: 2,
  treachery: 4,
  archenemy: 5,
};
type VariantType = keyof typeof variantMinPlayerCount;

export default function StartGame() {
  const { currentFriends } = useFriendsContext();
  const { startGame } = useGameContext();
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState<VariantType>();

  const handleVariantChange = useCallback(
    (e: any) => {
      setVariant(e.currentTarget.value);
    },
    [setVariant]
  );

  const handleStartGame = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const target = event.currentTarget;
      const variantName = target?.["variant"].value as VariantType;
      const startingLife = Number(target?.["starting-life"].value);
      const type = target?.["type"].value;
      const playerList = [...target?.["player"]]
        .filter((i) => i.checked)
        .map((i) => i.value);
      const variantOptions = [...(target?.["option"] || [])]
        .filter((i) => i.checked)
        .map((i) => i.value);
      const variant = {
        name: variantName,
        options: { rarity: variantOptions },
      };

      const playerCount = playerList.length + 1; // add one to account for current user/creator
      const needPlayerCount = variantMinPlayerCount[variantName] - playerCount;
      if (playerCount < variantMinPlayerCount[variantName]) {
        setError(
          `Need ${needPlayerCount} more player${
            needPlayerCount > 1 ? "s" : ""
          }, minimum is ${variantMinPlayerCount[variantName]}.`
        );
      } else {
        startGame({
          playerList,
          startingLife,
          variant: variantName === "none" ? null : JSON.stringify(variant),
          type,
        });
      }
    },
    [startGame]
  );

  return (
    <form onSubmit={handleStartGame}>
      {!!error && (
        <p>
          <strong>{error}</strong>
        </p>
      )}
      <p>
        <label htmlFor="starting-life">Starting Life for All Players</label>
        <input
          type="number"
          id="starting-life"
          name="starting-life"
          defaultValue={40}
          required
          min={10}
          max={100}
        />
      </p>
      <p>
        <label htmlFor="type">Game Type</label>
        <select id="type" name="type">
          <option value="commander">Commander/EDH</option>
        </select>
      </p>

      <p>
        <label htmlFor="variant">Game Variant</label>
        <select id="variant" name="variant" onChange={handleVariantChange}>
          <option value="none">None</option>
          <option value="treachery">Treachery</option>
          <option value="archenemy">Archenemy</option>
        </select>
      </p>

      <p>
        <label title="Coming Soon">
          <input
            type="checkbox"
            value="planeschase"
            disabled
            alt="Coming Soon"
          />
          Include Planeschase?{" "}
          <small>
            <em>coming soon</em>
          </small>
        </label>
      </p>

      <div>
        <p>
          <strong>Select Players</strong>
        </p>

        {currentFriends.length ? (
          <ul>
            {currentFriends.map((friend) => {
              return (
                <li key={friend.id}>
                  <label>
                    <input type="checkbox" value={friend.id} name="player" />
                    {friend.username}
                  </label>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>You need friends to play</p>
        )}
      </div>

      {variant === "treachery" && (
        <details>
          <summary>
            <strong>Customize Treachery Card Sets</strong>{" "}
            <small>(optional)</small>
          </summary>
          <ul>
            <li>
              <label>
                <input type="checkbox" name="option" defaultChecked value="M" />
                Mythics
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="option" defaultChecked value="R" />
                Rares
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="option" defaultChecked value="U" />
                Uncommons
              </label>
            </li>
          </ul>
        </details>
      )}
      <p>
        <button type="submit">Start Game</button>
      </p>
    </form>
  );
}
