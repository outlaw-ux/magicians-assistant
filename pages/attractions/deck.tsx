import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import { Deck } from "../../utils/types";

import { useDeckContext } from "../../context";

export default function AttractionsDeck() {
  const { supabase, user } = useSupabaseContext();
  const loadedAttractions = useRef(false);
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getDecks, loadingDecks } = useDeckContext();
  const [decks, setDecks] = useState<Deck[]>([]);

  useLayoutEffect(() => {
    if (decks.length === 0 && !loadedAttractions.current) {
      loadedAttractions.current = true;
      getDecks("attractions").then((getDecksResponse) => {
        if (getDecksResponse?.length) setDecks(getDecksResponse);
      });
    }
  }, [decks, supabase, user, getDecks]);

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
                <li key={deck.id}>{deck.name}</li>
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
