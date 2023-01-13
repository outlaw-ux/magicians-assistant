import React, { createContext, useCallback, useContext, useState } from "react";
import type { Attraction, DeckTypes } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

interface ICards {
  loadingCards: boolean;
  getCardsByType: (type: DeckTypes) => Promise<Attraction[] | null>;
}

const defaultContext: ICards = {
  loadingCards: false,
  getCardsByType: () => {
    return Promise.resolve(null);
  },
};

const CardsContext = createContext(defaultContext);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabaseContext();
  if (!supabase) throw new Error("How did you even get here?");
  const [loadingCards, setLoadingCards] = useState(false);

  const getCardsByType = useCallback(
    async (type: DeckTypes) => {
      setLoadingCards(true);
      const { data, error } = await supabase.from(`cards_${type}`).select("*");

      if (error) throw new Error(error.message);

      setLoadingCards(false);
      return data;
    },
    [setLoadingCards, supabase]
  );

  return (
    <CardsContext.Provider value={{ getCardsByType, loadingCards }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCardsContext() {
  return useContext(CardsContext);
}
