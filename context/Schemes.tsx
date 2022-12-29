import React, { createContext, useContext, useMemo, useState } from "react";
import type { Card } from "scryfall-api";
import { shuffle } from "../utils";
import scryfallCards from "../scryfall/schemes.json";

interface ISchemes {
  currentScheme: Card | undefined;
  ongoingSchemes: Card[];
  setCurrentSchemeIndex: React.Dispatch<React.SetStateAction<number>>;
  setOngoingSchemes: React.Dispatch<React.SetStateAction<Card[]>>;
  schemeCards: Card[];
}

const defaultContext: ISchemes = {
  currentScheme: undefined,
  ongoingSchemes: [],
  setCurrentSchemeIndex: () => {},
  setOngoingSchemes: () => {},
  schemeCards: [],
};

const SchemesContext = createContext(defaultContext);
const schemeCards = shuffle(scryfallCards.data);

export function SchemesContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ongoingSchemes, setOngoingSchemes] = useState<Card[]>([]);
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState<number>(0);
  const currentScheme = useMemo(
    () => schemeCards?.[currentSchemeIndex],
    [currentSchemeIndex]
  );

  let sharedState = {
    ...defaultContext,
    ongoingSchemes,
    currentScheme,
    setCurrentSchemeIndex,
    setOngoingSchemes,
    schemeCards,
  };

  return (
    <SchemesContext.Provider value={sharedState}>
      {children}
    </SchemesContext.Provider>
  );
}

export function useSchemesContext() {
  return useContext(SchemesContext);
}
