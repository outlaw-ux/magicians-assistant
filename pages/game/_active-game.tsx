import React from "react";
import { useGameContext } from "../../context";

/**
 *
 * 4 players: 1 Leader, 1 Traitor, 2 Assassins.
 * 5 players: 1 Leader, 1 Traitor, 2 Assassins, 1 Guardian.
 * 6 players: 1 Leader, 1 Traitor, 3 Assassins, 1 Guardian.
 * 7 players: 1 Leader, 1 Traitor, 3 Assassins, 2 Guardians.
 * 8 players: 1 Leader, 2 Traitors, 3 Assassins, 2 Guardians.
 *
 */

const ActiveGame = () => {
  const { activeGame, endGame, isGameCreator } = useGameContext();
  return (
    <>
      <h3>Currently in a game.</h3>

      <Card />
    </>
  );
};

export default ActiveGame;
