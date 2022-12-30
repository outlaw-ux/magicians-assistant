import React, { createContext, useContext, useMemo, useState } from "react";
import type { Card } from "scryfall-api";
import { shuffle } from "../utils";
import scryfallAttractionCards from "../scryfall/attractions.json";

interface IAttractions {
  currentAttraction: Card | undefined;
  drawNextCard: () => void;
  attractionCards: Card[];
}

const defaultContext: IAttractions = {
  currentAttraction: undefined,
  drawNextCard: () => {},
  attractionCards: [],
};

const AttractionsContext = createContext(defaultContext);
const attractionCards: Card[] = shuffle(scryfallAttractionCards.data);

export function AttractionsContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentAttractionIndex, setCurrentAttractionIndex] =
    useState<number>(-1);
  const drawNextCard = () => {
    setCurrentAttractionIndex((attractionIdx) => {
      const maxIdx = attractionCards.length - 1;
      const nextIdx = attractionIdx + 1;

      return nextIdx >= maxIdx ? attractionIdx : nextIdx;
    });
  };
  const currentAttraction: Card | undefined = useMemo(
    () =>
      currentAttractionIndex >= 0
        ? attractionCards?.[currentAttractionIndex]
        : undefined,
    [currentAttractionIndex]
  );

  const sharedState = {
    ...defaultContext,
    currentAttraction,
    drawNextCard,
    attractionCards,
  };

  return (
    <AttractionsContext.Provider value={sharedState}>
      {children}
    </AttractionsContext.Provider>
  );
}

export function useAttractionsContext() {
  return useContext(AttractionsContext);
}
