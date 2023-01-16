import React, { useCallback, useMemo } from "react";
import { useFriendsContext, useGameContext } from "../../context";
import Navigation from "../../components/Navigation";

export default function Game() {
  const { currentFriends } = useFriendsContext();
  const { activeGame, endGame, isGameCreator, startGame, leaveGame } =
    useGameContext();

  const handleEndGame = useCallback(endGame, [endGame]);
  const handleLeaveGame = useCallback(leaveGame, [leaveGame]);
  const isActivateGame = useMemo(() => !!activeGame, [activeGame]);

  const handleStartGame = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log(event.currentTarget?.["players[]"].value);

      const startingLife = Number(event.currentTarget?.["starting-life"].value);
      const variant = event.currentTarget?.["variant"].value;
      const type = event.currentTarget?.["type"].value;

      startGame({ startingLife, variant, type });
    },
    [startGame]
  );

  const endGameButton = useMemo(
    () => (
      <button
        type="button"
        onClick={isGameCreator ? handleEndGame : handleLeaveGame}>
        {isGameCreator ? "End Game" : "Leave Game"}
      </button>
    ),
    [isGameCreator, handleEndGame, handleLeaveGame]
  );

  return (
    <div id="game-page">
      <h2>Game Page</h2>

      <Navigation />

      {isActivateGame ? (
        <h3>Currently in a game</h3>
      ) : (
        <h3>Start a new game</h3>
      )}

      {isActivateGame ? (
        endGameButton
      ) : (
        <form onSubmit={handleStartGame}>
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
            <select id="variant" name="variant">
              <option value="">None</option>
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

            <ul>
              {currentFriends.map((friend) => {
                return (
                  <li key={friend.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={friend.id}
                        name="players[]"
                      />
                      {friend.username}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <p>
            <button type="submit">Start Game</button>
          </p>
        </form>
      )}
    </div>
  );
}
