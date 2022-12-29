import React, { createContext, useContext, useState } from "react";

const GameContext = createContext({
  gameStarted: false,
  toggleGameStart: () => {},
});

export function GameContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameStarted, setGameStarted] = useState(false);
  const toggleGameStart = () => {
    setGameStarted((currentState) => !currentState);
  };
  let sharedState = {
    gameStarted,
    toggleGameStart,
  };

  return (
    <GameContext.Provider value={sharedState}>{children}</GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
