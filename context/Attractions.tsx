import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Card } from "scryfall-api";
import { shuffle } from "../utils";
import scryfallAttractionCards from "../scryfall/attractions.json";

interface IAttractions {
  currentAttractions: Card[];
  drawNextCard: () => void;
  attractionDeck: Card[];
  sendToJunkyard: (value: Card["id"]) => void;
}

const defaultContext: IAttractions = {
  currentAttractions: [],
  drawNextCard: () => {},
  sendToJunkyard: () => {},
  attractionDeck: [],
};

const AttractionsContext = createContext(defaultContext);
const attractionDeck: Card[] = shuffle(scryfallAttractionCards.data);

export function AttractionsContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentAttractionIndex = useRef(-1);
  // const [currentAttractionIndex, setCurrentAttractionIndex] =
  //   useState<number>(-1);
  const [currentAttractions, setCurrentAttractions] = useState<Card[]>([]);
  const drawNextCard = () => {
    currentAttractionIndex.current += 1;
    setCurrentAttractions((attractions) =>
      currentAttractionIndex.current >= 0
        ? [...attractions, attractionDeck?.[currentAttractionIndex.current]]
        : []
    );
    // setCurrentAttractionIndex((attractionIdx) => {
    //   const maxIdx = attractionDeck.length - 1;
    //   const nextIdx = attractionIdx + 1;
    //   const outputIdx = nextIdx >= maxIdx ? attractionIdx : nextIdx;

    //   setCurrentAttractions((attractions) =>
    //     attractionIdx >= 0 ? [...attractions, attractionDeck?.[outputIdx]] : []
    //   );

    //   return outputIdx;
    // });
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
