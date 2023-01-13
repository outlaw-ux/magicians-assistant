import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import shuffle from "../../utils/shuffle";
import { Attraction, Deck } from "../../utils/types";
import { DECK_TYPE } from "./_constants";
import { useDeckContext } from "../../context";

export default function AttractionsDeck() {
  const { supabase, user } = useSupabaseContext();
  const loadedAttractions = useRef(false);
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getDecks, loadingDecks } = useDeckContext();
  // const [loading, setLoading] = useState(false);
  const [decks, setDecks] = useState<Deck[]>([]);

  // const getCard = useCallback(
  //   async (id: string) => {
  //     return await supabase
  //       .from(DECK_TYPE)
  //       .select("*")
  //       .eq("id", id)
  //       .then(({ data, error }) => {
  //         if (data) {
  //           return data as Attraction[];
  //         }
  //         if (error) throw new Error(error.message);
  //       });
  //   },
  //   [supabase]
  // );

  useLayoutEffect(() => {
    if (decks.length === 0 && !loadedAttractions.current) {
      loadedAttractions.current = true;
      getDecks("attractions").then((getDecksResponse) => {
        if (getDecksResponse?.length) setDecks(getDecksResponse);
      });
    }
  }, [decks, supabase, user]);

  return (
    <div id="attractions-page">
      <Navigation />
      <h2>Attractions Deck</h2>
      <Link href="/attractions/customize">Customize Deck</Link>
      <p>Render Deck</p>

      <pre>
        {loadingDecks ? (
          "Loading..."
        ) : decks?.length ? (
          <>
            <p>Here are your decks</p>
            <ul>
              {decks.map((deck) => (
                <li>{deck.name}</li>
              ))}
            </ul>

            <pre>{JSON.stringify(decks, undefined, 2)}</pre>
          </>
        ) : (
          <p>
            Create a <Link href="/attractions/customize">new deck</Link> first
          </p>
        )}
      </pre>
    </div>
  );
}
