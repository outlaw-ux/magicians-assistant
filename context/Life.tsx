import React, { createContext, useContext, useState } from "react";

interface ILife {
  currentLife: number;
  changeLife: (value: number) => void;
}

const defaultContext: ILife = {
  currentLife: 0,
  changeLife: () => {},
};

const LifeContext = createContext(defaultContext);

export function LifeContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLife, setCurrentLife] = useState(20);
  const changeLife = (lifeChange: number) => {
    setCurrentLife((life) => life + lifeChange);
  };

  const sharedState = {
    ...defaultContext,
    currentLife,
    changeLife,
  };

  return (
    <LifeContext.Provider value={sharedState}>{children}</LifeContext.Provider>
  );
}

export function useLifeContext() {
  return useContext(LifeContext);
}
