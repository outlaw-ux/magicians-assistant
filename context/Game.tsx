import React, { createContext, useContext, useEffect, useState } from "react";
import { useConfirmExit } from "../hooks";

interface IGame {
  gameStarted: boolean;
  toggleGameStart: () => void;
}

const defaultContext: IGame = {
  gameStarted: false,
  toggleGameStart: () => {},
};

const GameContext = createContext(defaultContext);

export function GameContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setNeedConfirm } = useConfirmExit();
  const [gameStarted, setGameStarted] = useState(false);
  const toggleGameStart = () => {
    setGameStarted((currentState) => !currentState);
  };

  let sharedState = {
    ...defaultContext,
    gameStarted,
    toggleGameStart,
  };

  useEffect(() => {
    setNeedConfirm(gameStarted);

    return () => {};
  }, [gameStarted, setNeedConfirm]);

  return (
    <GameContext.Provider value={sharedState}>{children}</GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
