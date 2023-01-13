import { useLayoutEffect, useCallback, useMemo, useRef, useState } from "react";
import { useSupabaseContext } from "../../context/Supabase";
import type { SchemeCard } from "../../utils/types";
import { shuffle } from "../../utils/deck";

import { useDeckContext } from "../../context";
import Card from "../../components/Card";
import next from "next";

export default function SchemesDeck() {
  const { supabase, user } = useSupabaseContext();
  const loadedSchemes = useRef(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  if (!supabase || !user) throw new Error("How did you even get here?");
  const { getDecks, loadingDecks } = useDeckContext();
  const [availableCards, setAvailableCards] = useState<SchemeCard[]>([]);
  const [ongoingCards, setOngoingCards] = useState<SchemeCard[]>([]);
  const [junkyardCards, setJunkyardCards] = useState<SchemeCard[]>([]);

  const reverseOrderOngoingCards = useMemo(
    () => [...ongoingCards].reverse(),
    [ongoingCards]
  );

  // useLayoutEffect(() => {
  //   if (
  //     gameStarted &&
  //     currentScheme?.type_line === "Ongoing Scheme" &&
  //     !ongoingSchemes.find((scheme) => scheme.id === currentScheme.id) // make sure it's not already ongoing
  //   ) {
  //     setOngoingSchemes((schemes) => [...schemes, currentScheme]);
  //   }
  // }, [currentScheme, gameStarted, ongoingSchemes, setOngoingSchemes]);

  const handleVisitScheme = useCallback(() => {
    const nextIdx = currentCardIndex + 1;
    const isOngoing = availableCards[nextIdx].type_line === "Ongoing Scheme";

    if (isOngoing) {
      const nextOngoingCards = [...ongoingCards, availableCards[nextIdx]];
      setOngoingCards(nextOngoingCards);
    }

    setCurrentCardIndex(nextIdx);
  }, [setOngoingCards, currentCardIndex, availableCards, ongoingCards]);

  const handleAbandonScheme = useCallback(
    (card: SchemeCard) => {
      if (window.confirm(`Are you sure you want to abandon '${card.name}'?`)) {
        const junkIdx = ongoingCards.findIndex((c) => c.id === card.id);
        const updatedOngoingCards = [...ongoingCards];
        updatedOngoingCards.splice(junkIdx, 1);

        setJunkyardCards([...junkyardCards, card]);
        setOngoingCards(updatedOngoingCards);
      }
    },
    [ongoingCards, setOngoingCards, junkyardCards]
  );

  const handleResetSchemes = useCallback(() => {
    if (window.confirm(`Are you sure you want to reset this game?`)) {
      setOngoingCards([]);
      setCurrentCardIndex(-1);
      setAvailableCards(shuffle(availableCards));
    }
  }, [availableCards]);

  useLayoutEffect(() => {
    if (!availableCards.length && !loadedSchemes.current) {
      loadedSchemes.current = true;
      getDecks("schemes").then((getDecksResponse) => {
        if (getDecksResponse?.length) {
          const cards: { selected: boolean; card: SchemeCard }[] = JSON.parse(
            getDecksResponse[0]?.cards || ""
          );
          const available = cards
            .filter(({ selected }) => !!selected)
            .map(({ card }) => card);
          setAvailableCards(shuffle(available));
        }
      });
    }
  }, [supabase, user, getDecks, availableCards]);

  return (
    <div id="schemes-page">
      {loadingDecks ? (
        "Loading..."
      ) : (
        <>
          <h3>Current Schemes</h3>
          <p>
            This page&apos;s state is currently not saved. If you leave you will
            lose your deck progress
          </p>
          <p>
            <button onClick={handleVisitScheme}>Visit New Scheme</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleResetSchemes}>
              Reset & Shuffle Schemes
            </button>
          </p>

          {currentCardIndex >= 0 && (
            <div key={availableCards[currentCardIndex].id}>
              <p>
                <strong>{availableCards[currentCardIndex].name}</strong>
              </p>
              {availableCards[currentCardIndex]["image_uris/normal"] && (
                <p>
                  <Card
                    src={`${availableCards[currentCardIndex]["image_uris/normal"]}`}
                    alt={`${availableCards[currentCardIndex].oracle_text}`}
                  />
                </p>
              )}
              <p>{availableCards[currentCardIndex].oracle_text}</p>
            </div>
          )}

          <br />
          <br />
          <br />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <br />
          <br />
          <br />
          {reverseOrderOngoingCards.map((scheme) => {
            const imagePath = scheme["image_uris/normal"];
            return (
              <div key={scheme.id}>
                <p>
                  <strong>{scheme.name}</strong>
                </p>
                <button onClick={() => handleAbandonScheme(scheme)}>
                  Abandon &apos;{scheme.name}&apos; Scheme
                </button>
                {imagePath && (
                  <p>
                    <Card src={imagePath} alt={`${scheme.oracle_text}`} />
                  </p>
                )}
                <p>{availableCards[currentCardIndex].oracle_text}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
