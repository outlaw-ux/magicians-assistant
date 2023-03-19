import React, { useCallback, useMemo, useState } from "react";
import { useFriendsContext, useGameContext } from "../../context";
import Navigation from "../../components/Navigation";
import type { IFriendProfile } from "../../utils/types";
import ChoosePlayer from "./_choose-player";
import { gameVariants } from "../../utils/constants";

export default function Game() {
  const { mutualFriends } = useFriendsContext();
  // const { activeGame, endGame, isGameCreator, startGame, leaveGame } = useGameContext();
  const { activeGame, createGame, endGame, isGameCreator } = useGameContext();
  const [selectedPlayers, setSelectedPlayers] = useState<
    IFriendProfile["id"][]
  >([]);
  const [startingLife, setStartingLife] = useState(40);
  const [gameVariant, setGameVariant] = useState("none");
  const handleEndGame = useCallback(endGame, [endGame]);
  const handleLeaveGame = useCallback(() => null, []);
  const isActivateGame = useMemo(() => !!activeGame, [activeGame]);

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

  const handleStartGame = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      createGame({
        startingLife,
        variant: gameVariant,
        players: selectedPlayers,
      });
    },
    [selectedPlayers, createGame, startingLife, gameVariant]
  );

  const handleChangeVariant = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setGameVariant(event.currentTarget.value);
    },
    []
  );

  const handleChangeStartingLife = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStartingLife(Number(event.currentTarget.value));
    },
    []
  );

  const togglePlayer = useCallback(
    (playerId: IFriendProfile["id"]) => {
      if (selectedPlayers.includes(playerId)) {
        handleRemovePlayer(playerId);
      } else {
        handleAddPlayer(playerId);
      }
    },
    [selectedPlayers]
  );
  const handleAddPlayer = useCallback(
    (playerId: IFriendProfile["id"]) => {
      setSelectedPlayers([...selectedPlayers, playerId]);
    },
    [togglePlayer, selectedPlayers]
  );
  const handleRemovePlayer = useCallback(
    (playerId: IFriendProfile["id"]) => {
      const players = [...selectedPlayers];
      const playerIdx = players.findIndex((p) => p === playerId);
      if (playerIdx >= 0) players.splice(playerIdx, 1);

      setSelectedPlayers(players);
    },
    [togglePlayer, selectedPlayers]
  );

  return (
    <div id="game-page">
      <h2>Game Page</h2>

      <Navigation />

      {isActivateGame ? (
        <h3>
          Currently in a game:{" "}
          <pre>
            <code>{activeGame}</code>
          </pre>
        </h3>
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
              value={startingLife}
              onChange={handleChangeStartingLife}
              required
              min={10}
              max={100}
            />
          </p>

          <p>
            <label htmlFor="variant">Game Variant</label>
            <select
              id="variant"
              name="variant"
              onChange={handleChangeVariant}
              value={gameVariant}>
              {Object.keys(gameVariants).map((variant) => (
                <option value={variant} key={variant}>
                  {gameVariants[variant].title}
                </option>
              ))}
            </select>
          </p>

          <div>
            <p>
              <strong>Select Players</strong>
            </p>

            <ul>
              {mutualFriends.map((friend) => {
                return (
                  <ChoosePlayer
                    key={friend.id}
                    friend={friend}
                    checked={selectedPlayers.includes(friend.id)}
                    onChange={togglePlayer}
                  />
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
