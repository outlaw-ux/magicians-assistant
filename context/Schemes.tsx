import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import type { Card } from "scryfall-api";
import { shuffle } from "../utils";
import scryfallCards from "../scryfall/schemes.json";
import { useGameContext } from "./Game";

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
  const { gameStarted } = useGameContext();
  const [ongoingSchemes, setOngoingSchemes] = useState<Card[]>([]);
  const [currentSchemeIndex, setCurrentSchemeIndex] = useState<number>(-1);
  const currentScheme: Card | undefined = useMemo(
    () =>
      currentSchemeIndex >= 0 ? schemeCards?.[currentSchemeIndex] : undefined,
    [currentSchemeIndex]
  );

  const sharedState = {
    ...defaultContext,
    ongoingSchemes,
    currentScheme,
    setCurrentSchemeIndex,
    setOngoingSchemes,
    schemeCards,
  };

  useLayoutEffect(() => {
    if (
      gameStarted &&
      currentScheme?.type_line === "Ongoing Scheme" &&
      !ongoingSchemes.find((scheme) => scheme.id === currentScheme.id) // make sure it's not already ongoing
    ) {
      setOngoingSchemes((schemes) => [...schemes, currentScheme]);
    }
  }, [currentScheme, gameStarted, ongoingSchemes, setOngoingSchemes]);

  return (
    <SchemesContext.Provider value={sharedState}>
      {children}
    </SchemesContext.Provider>
  );
}

export function useSchemesContext() {
  return useContext(SchemesContext);
}
