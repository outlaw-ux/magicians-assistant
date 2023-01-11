import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import { Attraction, Deck } from "../../utils/types";
import AttractionsCustomizeTableRow from "./_table-row";
import { DECK_TYPE } from "./_constants";
import { useGameContext } from "../../context";

const filterCards = (cards: any[]) => cards?.map((c) => c.id);

export default function AttractionsCustomizeDeck() {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getDeck } = useGameContext();
  const [loadingAttractions, setLoadingAttractions] = useState(false);
  const [loadingDecks, setLoadingDecks] = useState(false);
  const [attractionCards, setAttractionCards] = useState<Attraction[]>([]);
  const [deckCardIds, setDeckCardIds] = useState<Attraction["id"][]>([]);
  const [deckId, setDeckId] = useState<Deck["id"]>();

  const getAttractionCards = useCallback(async () => {
    return await supabase
      .from(DECK_TYPE)
      .select("*")
      .then(({ data, error }) => {
        if (data) {
          return data as Attraction[];
        }
        if (error) throw new Error(error.message);
      });
  }, [supabase]);

  const createDeck = useCallback(
    async (cardIds: Attraction["id"][]) => {
      const createResponse = await supabase
        .from("decks")
        .insert({ cards: cardIds, user_id: user?.id, type: DECK_TYPE })
        .select();
      setDeckId(createResponse?.data?.[0].id);
    },
    [supabase, user, setDeckId]
  );

  const selectOrCreateDeck = useCallback(async () => {
    setLoadingDecks(true);

    getDeck().then((existingDeck) => {
      console.log({ existingDeck });
      setLoadingDecks(false);
      if (existingDeck?.length) {
        setDeckId(existingDeck[0].id);
        setDeckCardIds(existingDeck[0].cards);
      } else {
        const allCardIds = filterCards(attractionCards);
        createDeck(allCardIds);
        setDeckCardIds(allCardIds);
      }
    });
  }, [
    attractionCards,
    createDeck,
    setDeckCardIds,
    setDeckId,
    setLoadingDecks,
    supabase,
    user,
  ]);

  const handleSaveDeck = useCallback(async () => {
    supabase
      .from("decks")
      .upsert({
        id: deckId,
        cards: deckCardIds,
        type: DECK_TYPE,
        user_id: user?.id,
      })
      .then((output) => {
        console.log("handleSaveDeck", output);
      });
  }, [deckId, deckCardIds, user, supabase]);

  const handleCardToggle = useCallback(
    (cardId: Attraction["id"]) => {
      setDeckCardIds((deck) => {
        if (deck?.includes(cardId)) {
          return deck.filter((c) => c !== cardId);
        } else {
          return [...deck, cardId];
        }
      });
    },
    [setDeckCardIds]
  );

  useEffect(() => {
    if (!attractionCards?.length && supabase && !loadingAttractions) {
      setLoadingAttractions(true);
      getAttractionCards().then((res) => {
        if (res) {
          setAttractionCards(res);
          setLoadingAttractions(false);
          selectOrCreateDeck();
        }
      });
    }
  }, [
    attractionCards,
    getAttractionCards,
    loadingAttractions,
    selectOrCreateDeck,
    setAttractionCards,
    setLoadingAttractions,
    supabase,
  ]);

  return (
    <div id="attractions-page">
      <Navigation />
      <h2>Attractions Deck</h2>
      <p>
        Once you&apos;ve customized your deck you can save it and access it from{" "}
        <Link href="/attractions/deck">Your Deck</Link> page
      </p>
      {loadingAttractions || loadingDecks ? (
        "Loading..."
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Preview</th>
              <th>Name</th>
              <th>Oracle Text</th>
            </tr>
          </thead>
          <tbody>
            {attractionCards?.map((card) => (
              <AttractionsCustomizeTableRow
                key={card.id}
                card={card}
                selected={!!deckCardIds?.includes(card.id)}
                onCheck={() => handleCardToggle(card.id)}
              />
            ))}
          </tbody>
        </table>
      )}
      <p>
        <button
          onClick={handleSaveDeck}
          type="button"
          disabled={deckCardIds.length < 10}>
          Save
        </button>{" "}
        {deckCardIds.length < 10 && <span>Gotta have 10 Attractions</span>}
      </p>
    </div>
  );
}
