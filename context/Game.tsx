import React, { createContext, useContext, useEffect, useState } from "react";
import StartGame from "../components/StartGame";
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

  const sharedState = {
    ...defaultContext,
    gameStarted,
    toggleGameStart,
  };

  useEffect(() => {
    setNeedConfirm(gameStarted);

    return () => {};
  }, [gameStarted, setNeedConfirm]);

  return (
    <GameContext.Provider value={sharedState}>
      {gameStarted ? children : <StartGame />}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
