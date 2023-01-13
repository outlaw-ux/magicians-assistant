import Link from "next/link";
import { useLayoutEffect, useCallback, useMemo, useRef, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import type { Attraction, Deck } from "../../utils/types";
import { shuffle } from "../../utils/deck";

import { useDeckContext } from "../../context";
import Card from "../../components/Card";

export default function AttractionsDeck() {
  const { supabase, user } = useSupabaseContext();
  const loadedAttractions = useRef(false);
  // const currentCardIndex = useRef(-1);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getDecks, loadingDecks } = useDeckContext();
  const [deck, setDeck] = useState<Deck>();
  const [availableCards, setAvailableCards] = useState<Attraction[]>([]);
  const [ongoingCards, setOngoingCards] = useState<Attraction[]>([]);

  const reverseOrderOngoingCards = useMemo(
    () => [...ongoingCards].reverse(),
    [ongoingCards]
  );

  const handleVisitAttraction = useCallback(() => {
    const nextIdx = currentCardIndex + 1;
    const nextOngoingCards = [...ongoingCards];
    nextOngoingCards.push(availableCards[nextIdx]);

    setCurrentCardIndex(nextIdx);
    setOngoingCards(nextOngoingCards);
  }, [setOngoingCards, currentCardIndex, availableCards]);

  useLayoutEffect(() => {
    if (!deck && !loadedAttractions.current) {
      loadedAttractions.current = true;
      getDecks("attractions").then((getDecksResponse) => {
        if (getDecksResponse?.length) setDeck(getDecksResponse[0]);
      });
    }
  }, [deck, supabase, user, getDecks]);

  useLayoutEffect(() => {
    if (deck) {
      const cards: { selected: boolean; card: Attraction }[] = JSON.parse(
        deck?.cards || ""
      );
      const available = cards
        .filter(({ selected }) => !!selected)
        .map(({ card }) => card);
      setAvailableCards(shuffle(available));
    }
  }, [deck]);

  return (
    <div id="attractions-page">
      <Navigation />

      {loadingDecks ? (
        "Loading..."
      ) : (
        <>
          <h2>Current Attractions</h2>
          <p>
            <Link href="/attractions/customize">Customize Deck</Link>
          </p>
          <p>
            <button onClick={handleVisitAttraction}>
              Visit New Attraction
            </button>
          </p>

          {reverseOrderOngoingCards.map((attraction) => {
            const imagePath = attraction["image_uris/normal"];
            return (
              <div key={attraction?.id}>
                <p>
                  <strong>{attraction?.name}</strong>
                </p>
                <p>
                  {imagePath && (
                    <Card src={imagePath} alt={`${attraction?.oracle_text}`} />
                  )}
                </p>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to send '${attraction?.name}' to the Junkyard?`
                      )
                    ) {
                      console.log("Send to junkyard", attraction?.id);
                    }
                  }}>
                  Send &apos;{attraction?.name}&apos; to Junkyard
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
