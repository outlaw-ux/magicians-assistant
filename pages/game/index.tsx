import React, { useMemo } from "react";
import { useGameContext } from "../../context";
import Navigation from "../../components/Navigation";
import StartGame from "./_start-game";
import EndGame from "./_end-game";

export default function Game() {
  const { activeGame } = useGameContext();

  const isActivateGame = useMemo(() => !!activeGame, [activeGame]);

  return (
    <div id="game-page">
      <h2>Game Page</h2>

      <Navigation />

      {isActivateGame ? (
        <h3>Currently in a game</h3>
      ) : (
        <h3>Start a new game</h3>
      )}

      {isActivateGame && <EndGame />}
      {!isActivateGame && <StartGame />}
    </div>
  );
}
