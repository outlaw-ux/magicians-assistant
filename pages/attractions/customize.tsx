import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import Navigation from "../../components/Navigation";
import { Attraction, Deck } from "../../utils/types";
import AttractionsCustomizeTableRow from "./_table-row";
import { useCardsContext, useDeckContext } from "../../context";

export default function AttractionsCustomizeDeck() {
  const { loadingCards } = useCardsContext();
  const { getDecks, updateDeck } = useDeckContext();
  const [attractionDeck, setAttractionDeck] = useState<Deck>();

  useLayoutEffect(() => {
    if (!attractionDeck) {
      getDecks("attractions").then((getDecksResponse) => {
        if (getDecksResponse?.length) {
          setAttractionDeck(getDecksResponse[0]);
        }
      });
    }
  }, [attractionDeck]);

  const cards = useMemo(
    (): Attraction[] =>
      attractionDeck?.cards ? JSON.parse(attractionDeck?.cards) : [],
    [attractionDeck]
  );

  const handleToggleRow = useCallback(
    ({ card, selected }: { card: Attraction; selected: boolean }) => {
      if (attractionDeck?.id) {
        const updatedCards = [...cards];
        const cardIdx = cards.findIndex((c) => c.card.id === card.id);

        if (updatedCards[cardIdx]) {
          updatedCards[cardIdx].selected = selected;

          updateDeck(attractionDeck.id, updatedCards, attractionDeck.name);
        }
      }
    },
    [attractionDeck, cards]
  );

  return (
    <div id="attractions-page">
      <Navigation />
      <h2>Attractions Deck</h2>
      <p>
        Once you&apos;ve customized your deck you can save it and access it from{" "}
        <Link href="/attractions/deck">Your Deck</Link> page
      </p>

      {loadingCards && !attractionDeck?.cards ? (
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
            {cards.map(
              ({ card, selected }: { card: Attraction; selected: boolean }) => (
                <AttractionsCustomizeTableRow
                  key={card.id}
                  card={card}
                  selected={selected}
                  onChange={handleToggleRow}
                />
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
