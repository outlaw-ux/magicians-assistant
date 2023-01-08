import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Card } from "scryfall-api";
import { shuffle, supabase } from "../utils";

interface IDecks {
  currentDecks: Card[];
  drawNextCard: () => void;
  attractionDeck: Card[];
  sendToJunkyard: (value: Card["id"]) => void;
}

const defaultContext: IDecks = {
  currentDecks: [],
  drawNextCard: () => {},
  sendToJunkyard: () => {},
  attractionDeck: [],
};

const DecksContext = createContext(defaultContext);

export function DecksContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadDecks = async () => {
    const { data: attractions, error } = await supabase
      .from("attractions")
      .select("*");

    console.log(attractions, error);

    if (error) {
      throw new Error(error.message);
    }

    console.log({ attractions });

    setLoaded(true);
    setDeckDeck(shuffle(attractions));
  };

  const [loaded, setLoaded] = useState(false);
  const [attractionDeck, setDeckDeck] = useState(defaultContext.attractionDeck);
  const currentDeckIndex = useRef(-1);
  const [currentDecks, setCurrentDecks] = useState<Card[]>(
    defaultContext.currentDecks
  );

  const drawNextCard = (deck: Card[] = attractionDeck) => {
    currentDeckIndex.current += 1;

    setCurrentDecks((attractions) => {
      return currentDeckIndex.current >= 0
        ? [...attractions, deck?.[currentDeckIndex.current]]
        : [];
    });
  };

  const sendToJunkyard = (attractionID: Card["id"]) => {
    const filteredDecks = currentDecks.filter(
      (attraction) => attraction.id !== attractionID
    );
    setCurrentDecks(filteredDecks);
  };

  const sharedState = useMemo(
    () => ({
      ...defaultContext,
      currentDecks,
      drawNextCard,
      attractionDeck,
      sendToJunkyard,
    }),
    [attractionDeck, currentDecks]
  );

  useEffect(() => {
    if (!loaded) loadDecks();
  }, [loaded]);

  return (
    <DecksContext.Provider value={sharedState}>
      {children}
    </DecksContext.Provider>
  );
}

export function useDecksContext() {
  return useContext(DecksContext);
}
