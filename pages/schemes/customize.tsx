import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import Navigation from "../../components/Navigation";
import type { SchemeCard, Deck } from "../../utils/types";
import SchemesCustomizeTableRow from "./_table-row";
import { useCardsContext, useDeckContext } from "../../context";

export default function SchemesCustomizeDeck() {
  const { loadingCards } = useCardsContext();
  const { getDecks, updateDeck } = useDeckContext();
  const [schemeDeck, setSchemeDeck] = useState<Deck>();

  useLayoutEffect(() => {
    if (!schemeDeck) {
      getDecks("schemes").then((getDecksResponse) => {
        if (getDecksResponse?.length) {
          setSchemeDeck(getDecksResponse[0]);
        }
      });
    }
  }, [schemeDeck, getDecks]);

  const cards = useMemo(
    (): { selected: boolean; card: SchemeCard }[] =>
      schemeDeck?.cards ? JSON.parse(schemeDeck?.cards) : [],
    [schemeDeck]
  );

  const handleToggleRow = useCallback(
    ({ card, selected }: { card: SchemeCard; selected: boolean }) => {
      if (schemeDeck?.id) {
        const updatedCards = [...cards];
        const cardIdx = cards.findIndex((c) => c.card.id === card.id);

        if (updatedCards[cardIdx]) {
          updatedCards[cardIdx].selected = selected;

          updateDeck(schemeDeck.id, updatedCards, schemeDeck.name);
        }
      }
    },
    [schemeDeck, cards, updateDeck]
  );

  return (
    <div id="schemes-page">
      <Navigation />
      <h2>Schemes Deck</h2>
      <p>
        Once you&apos;ve customized your deck you can access it from{" "}
        <Link href="/schemes">Your Schemes</Link> page
      </p>

      {loadingCards && !schemeDeck?.cards ? (
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
              ({ card, selected }: { card: SchemeCard; selected: boolean }) => (
                <SchemesCustomizeTableRow
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
