import React, { useState } from "react";
import type { Card as CardType } from "scryfall-api";
import Card from "../../../components/Card";

export default function TokenListItem({ token }: { token: CardType }) {
  const [viewLargeCard, setViewLargeCard] = useState(false);

  const toggleImageDialog = () => {
    setViewLargeCard((largeCard) => !largeCard);
  };

  return (
    <li>
      <p>
        <strong>{token.name}</strong>
      </p>
      {token.image_uris?.normal && (
        <>
          <Card
            src={token.image_uris.normal}
            width={30}
            height={43}
            alt={token.name}
            onClick={() => toggleImageDialog()}
          />

          <dialog open={viewLargeCard}>
            <Card
              src={token.image_uris.normal}
              alt={token.name}
              onClick={() => toggleImageDialog()}
            />
          </dialog>
        </>
      )}

      <ul>
        <li>{token.type_line}</li>
        {token.oracle_text && <li>{token.oracle_text}</li>}
        <li>
          {token.power}/{token.toughness}
        </li>
      </ul>
    </li>
  );
}
