import Link from "next/link";
import { useLayoutEffect, useCallback, useMemo, useRef, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import type { Attraction } from "../../utils/types";
import { shuffle } from "../../utils/deck";

import { useDeckContext } from "../../context";
import Card from "../../components/Card";

export default function AttractionsDeck() {
  const { supabase, user } = useSupabaseContext();
  const loadedAttractions = useRef(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getDecks, loadingDecks } = useDeckContext();
  const [availableCards, setAvailableCards] = useState<Attraction[]>([]);
  const [ongoingCards, setOngoingCards] = useState<Attraction[]>([]);
  const [junkyardCards, setJunkyardCards] = useState<Attraction[]>([]);

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
  }, [setOngoingCards, currentCardIndex, availableCards, ongoingCards]);

  const handleSendToJunkyard = useCallback(
    (card: Attraction) => {
      if (
        window.confirm(
          `Are you sure you want to send '${card.name}' to the Junkyard?`
        )
      ) {
        const junkIdx = ongoingCards.findIndex((c) => c.id === card.id);
        const updatedOngoingCards = [...ongoingCards];
        const newJunkyard = [...junkyardCards];
        newJunkyard.push(card);
        setJunkyardCards(newJunkyard);
        updatedOngoingCards.splice(junkIdx, 1);
        console.log(updatedOngoingCards);
        setOngoingCards(updatedOngoingCards);
      }
    },
    [ongoingCards, setOngoingCards]
  );

  const handleResetAttractions = useCallback(() => {
    if (window.confirm(`Are you sure you want to reset this game?`)) {
      setOngoingCards([]);
      setCurrentCardIndex(-1);
      setAvailableCards(shuffle(availableCards));
    }
  }, []);

  useLayoutEffect(() => {
    if (!availableCards.length && !loadedAttractions.current) {
      loadedAttractions.current = true;
      getDecks("attractions").then((getDecksResponse) => {
        if (getDecksResponse?.length) {
          const cards: { selected: boolean; card: Attraction }[] = JSON.parse(
            getDecksResponse[0]?.cards || ""
          );
          const available = cards
            .filter(({ selected }) => !!selected)
            .map(({ card }) => card);
          setAvailableCards(shuffle(available));
        }
      });
    }
  }, [supabase, user, getDecks]);

  useLayoutEffect(() => {
    console.log({ reverseOrderOngoingCards });
  }, [reverseOrderOngoingCards]);

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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleResetAttractions}>Reset Attractions</button>
          </p>

          {reverseOrderOngoingCards.map((attraction) => {
            const imagePath = attraction["image_uris/normal"];
            return (
              <div key={attraction.id}>
                <p>
                  <strong>{attraction.name}</strong>
                </p>
                <p>
                  {imagePath && (
                    <Card src={imagePath} alt={`${attraction.oracle_text}`} />
                  )}
                </p>
                <button onClick={() => handleSendToJunkyard(attraction)}>
                  Send &apos;{attraction.name}&apos; to Junkyard
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
