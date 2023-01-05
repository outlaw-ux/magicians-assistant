import React, { createContext, useContext, useState } from "react";
import type { Card as CardType } from "scryfall-api";

interface IBattlefieldItem {
  card: CardType;
  tapped: boolean;
}

interface IBattlefield {
  currentBattlefield: IBattlefieldItem[];
  togglePermanentTap: (value: CardType["id"], instanceIdx: number) => void;
  addPermanent: (value: IBattlefieldItem) => void;
  removePermanent: (value: CardType["id"]) => void;
}

const defaultContext: IBattlefield = {
  currentBattlefield: [],
  togglePermanentTap: () => {},
  addPermanent: () => {},
  removePermanent: () => {},
};

const BattlefieldContext = createContext(defaultContext);

export function BattlefieldContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentBattlefield, setCurrentBattlefield] = useState(
    defaultContext.currentBattlefield
  );
  const togglePermanentTap = (tokenId: CardType["id"], instanceIdx: number) => {
    console.log(tokenId, instanceIdx);
    setCurrentBattlefield([]);
  };

  const addPermanent = ({ card, tapped = false }: IBattlefieldItem) => {
    setCurrentBattlefield((battlefield) => [...battlefield, { card, tapped }]);
  };
  const removePermanent = (tokenId: CardType["id"]) => {
    console.log(tokenId);
    setCurrentBattlefield([]);
  };

  const sharedState = {
    ...defaultContext,
    currentBattlefield,
    togglePermanentTap,
    addPermanent,
    removePermanent,
  };

  return (
    <BattlefieldContext.Provider value={sharedState}>
      {children}
    </BattlefieldContext.Provider>
  );
}

export function useBattlefieldContext() {
  return useContext(BattlefieldContext);
}
