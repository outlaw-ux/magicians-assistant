import React, { useCallback } from "react";
import { useGameContext } from "../../context";

export default function EndGame() {
  const { endGame, isGameCreator, leaveGame } = useGameContext();

  const handleEndGame = useCallback(endGame, [endGame]);
  const handleLeaveGame = useCallback(leaveGame, [leaveGame]);

  return (
    <button
      type="button"
      onClick={isGameCreator ? handleEndGame : handleLeaveGame}>
      {isGameCreator ? "End Game" : "Leave Game"}
    </button>
  );
}
