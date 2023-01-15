import React, { createContext, useCallback, useContext, useState } from "react";
import { Game, Profile } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

interface IGame {
  activeGame: Game["id"] | null;
  gamePlayers: Game["players"];
  addFriendToGame: (friendId: Profile["id"]) => Promise<Game | null>;
  startGame: () => Promise<Game | null>;
}

const defaultContext: IGame = {
  activeGame: null,
  gamePlayers: [],
  addFriendToGame: () => Promise.resolve(null),
  startGame: () => Promise.resolve(null),
};

const GameContext = createContext(defaultContext);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const [activeGame, setActiveGame] = useState(defaultContext.activeGame);
  const [gamePlayers, setGamePlayers] = useState(defaultContext.gamePlayers);

  const startGame = useCallback(async () => {
    if (!activeGame) {
      return supabase
        .from("games")
        .insert({
          creator: user.id,
          is_active: true,
          players: [user.id],
        })
        .select()
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          setGamePlayers([user.id]);
          setActiveGame(data[0].id);
          return data[0];
        });
    }
  }, [activeGame]);

  const addFriendToGame: IGame["addFriendToGame"] = useCallback(
    async (friendId) => {
      console.log("addFriend", friendId);
      return Promise.resolve(null);
    },
    []
  );

  // start game
  // - player.id      []
  // - deck.id        []
  // - id             uuid
  // - creator        profile.id
  // - game_type      standard/modern, commander/edh
  // - variant        treachery, archenemeny
  // - starting_life  number
  // - is_active      bool
  // end game
  // - set is_active to false
  // restart game
  // - reshuffle all decks
  // - reset all life
  // - if variant redeal identity cards
  return (
    <GameContext.Provider
      value={{ activeGame, startGame, addFriendToGame, gamePlayers }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
