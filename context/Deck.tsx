import { PostgrestResponse } from "@supabase/supabase-js";
import React, { createContext, useCallback, useContext, useState } from "react";
import type {
  Attraction,
  Deck,
  DeckTypes,
  SchemeCard,
  StickerCard,
  TokenCard,
} from "../utils/types";
import { useCardsContext } from "./Cards";
import { useSupabaseContext } from "./Supabase";

type DeckState = { [type: string]: Deck[] };
type CardTypes = Attraction | SchemeCard | TokenCard | StickerCard;

interface IDeck {
  loadingDecks: boolean;
  getDecks: (type: DeckTypes) => Promise<Deck[] | null>;
  updateDeck: (
    deckId: Deck["id"],
    cards: { selected: boolean; card: CardTypes }[],
    name: Deck["name"]
  ) => Promise<void | PostgrestResponse<undefined>>;
}

const defaultContext: IDeck = {
  loadingDecks: false,
  getDecks: async () => {
    return Promise.resolve(null);
  },
  updateDeck: async () => {
    return Promise.resolve();
  },
};

const DeckContext = createContext(defaultContext);

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getCardsByType } = useCardsContext();
  const [decks, setDecks] = useState<DeckState>();
  const [loadingDecks, setLoadingDecks] = useState(false);

  const updateDeck: IDeck["updateDeck"] = useCallback(
    async (deckId, cards, name) => {
      setDecks((deck) => {
        if (deck) {
          const updatedDeck: DeckState = {};
          Object.keys(deck).forEach((deckType) => {
            updatedDeck[deckType] = deck[deckType].map((dk) => {
              if (dk.id === deckId) {
                return { ...dk, cards: JSON.stringify(cards), name };
              }
              return dk;
            });
          });
          return updatedDeck;
        }
        return deck;
      });

      return supabase.from("decks").upsert({
        id: deckId,
        cards: JSON.stringify(cards),
        name,
      });
    },
    [supabase]
  );

  const createDeck = useCallback(
    async (type: DeckTypes, cards: CardTypes[]) => {
      const { data: deckData, error: deckError } = await supabase
        .from("decks")
        .insert({
          cards: JSON.stringify(
            cards.map((card) => ({
              selected: true,
              card,
            }))
          ),
          user_id: user?.id,
          type,
          name: `Default ${type} deck`,
        })
        .select();
      if (deckError) throw new Error(deckError.message);
      return deckData;
    },
    [supabase, user]
  );

  const getDecks = useCallback(
    async (type: DeckTypes): Promise<Deck[]> => {
      if (decks?.[type]) return decks[type];
      setLoadingDecks(true);
      const { data: deckData, error: deckError }: PostgrestResponse<Deck> =
        await supabase
          .from("decks")
          .select("*")
          .eq("user_id", user.id)
          .eq("type", type);
      if (deckError) throw new Error(deckError.message);
      if (deckData?.length) {
        setDecks((allDecks) => ({ ...allDecks, [type]: deckData }));
        setLoadingDecks(false);
        return deckData;
      } else {
        const defaultCards = await getCardsByType(type);
        if (!defaultCards)
          throw new Error(
            `Unable to build deck with no cards of type: ${type}`
          );
        const newDeck = await createDeck(type, defaultCards);
        setDecks((allDecks) => ({ ...allDecks, [type]: newDeck }));
        setLoadingDecks(false);
        return newDeck;
      }
    },
    [supabase, user, setLoadingDecks]
  );

  return (
    <DeckContext.Provider value={{ loadingDecks, getDecks, updateDeck }}>
      {children}
    </DeckContext.Provider>
  );
}

export function useDeckContext() {
  return useContext(DeckContext);
}
