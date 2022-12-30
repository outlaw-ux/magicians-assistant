import React, { createContext, useContext, useRef, useState } from "react";
import type { Card } from "scryfall-api";
import { shuffle } from "../utils";

interface IAttractions {
  currentAttractions: Card[];
  drawNextCard: () => Promise<void>;
  attractionDeck: Card[];
  sendToJunkyard: (value: Card["id"]) => void;
}

const defaultContext: IAttractions = {
  currentAttractions: [],
  drawNextCard: () => new Promise(() => {}),
  sendToJunkyard: () => {},
  attractionDeck: [],
};

const AttractionsContext = createContext(defaultContext);

export function AttractionsContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentAttractionIndex = useRef(-1);
  const [attractionDeck, setAttractionDeck] = useState<Card[]>([]);
  const [currentAttractions, setCurrentAttractions] = useState<Card[]>([]);
  const drawNextCard = async () => {
    if (attractionDeck.length === 0) {
      const Deck = (await import("../scryfall/attractions.json")).default;
      const shuffledDeck = shuffle(Deck.data);
      setAttractionDeck(() => {
        updateCurrentAttractions(shuffledDeck);
        return shuffledDeck;
      });
    } else {
      updateCurrentAttractions();
    }
  };
  const updateCurrentAttractions = (deck: Card[] = attractionDeck) => {
    currentAttractionIndex.current += 1;

    setCurrentAttractions((attractions) => {
      console.log(currentAttractionIndex.current, deck);
      return currentAttractionIndex.current >= 0
        ? [...attractions, deck?.[currentAttractionIndex.current]]
        : [];
    });
  };

  const sendToJunkyard = (attractionID: Card["id"]) => {
    const filteredAttractions = currentAttractions.filter(
      (attraction) => attraction.id !== attractionID
    );
    setCurrentAttractions(filteredAttractions);
  };

  const sharedState = {
    ...defaultContext,
    currentAttractions,
    drawNextCard,
    attractionDeck,
    sendToJunkyard,
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
