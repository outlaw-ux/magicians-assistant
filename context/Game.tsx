import React, { createContext, useCallback, useContext, useState } from "react";
import type { Deck, DeckTypes } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

// interface IGame {
//   getDeck: (type: DeckTypes) => Promise<Deck>;
// }

const defaultContext = {
  getDeck: async () => {
    return Promise.resolve();
  },
};

const GameContext = createContext(defaultContext);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const [decks, setDecks] = useState<{ [type in DeckTypes]: Deck }[]>([]);

  const getDeck = useCallback(
    async (type: DeckTypes) => {
      return supabase
        .from("decks")
        .select("*")
        .eq("user_id", user.id)
        .eq("type", type)
        .then(({ data, error }) => {
          if (data?.length) {
            setDecks((ds) => {
              return { ...ds, [type]: data };
            });
            return data;
          }
          if (error) throw new Error(error.message);
        });
    },
    [supabase, user]
  );

  return (
    <GameContext.Provider value={{ decks, getDeck }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
