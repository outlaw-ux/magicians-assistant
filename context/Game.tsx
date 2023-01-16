import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { Game, Profile } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

interface IGame {
  activeGame: Game["id"] | null;
  gamePlayers: Game["players"];
  isGameCreator: boolean;
  addFriendToGame: (friendId: Profile["id"]) => Promise<Game | null>;
  startGame: ({
    startingLife,
    type,
    variant,
  }: {
    startingLife: Game["starting_life"];
    type: Game["game_type"];
    variant: Game["variant"];
  }) => Promise<Game | null>;
  endGame: () => Promise<null>;
  leaveGame: () => Promise<null>;
}

const defaultContext: IGame = {
  activeGame: null,
  gamePlayers: [],
  isGameCreator: false,
  addFriendToGame: () => Promise.resolve(null),
  startGame: () => Promise.resolve(null),
  endGame: () => Promise.resolve(null),
  leaveGame: () => Promise.resolve(null),
};

const GameContext = createContext(defaultContext);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const [loadedGame, setLoadedGame] = useState(false);
  const [activeGame, setActiveGame] = useState(defaultContext.activeGame);
  const [gamePlayers, setGamePlayers] = useState(defaultContext.gamePlayers);
  const [isGameCreator, setIsGameCreator] = useState(false);

  const startGame: IGame["startGame"] = useCallback(
    async ({ startingLife, type, variant }) => {
      if (!activeGame) {
        return supabase
          .from("games")
          .insert({
            creator: user.id,
            is_active: true,
            players: [user.id],
            starting_life: startingLife,
            game_type: type,
            variant,
          })
          .select()
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            setGamePlayers([user.id]);
            setActiveGame(data[0].id);
            setIsGameCreator(true);
            return data[0];
          });
      }
    },
    [activeGame]
  );

  const addFriendToGame: IGame["addFriendToGame"] = useCallback(
    async (friendId) => {
      const updatedPlayers = [...gamePlayers, friendId];
      return supabase
        .from("games")
        .update({ players: updatedPlayers })
        .eq("id", activeGame)
        .select()
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          setGamePlayers(updatedPlayers);
          return data?.[0];
        });
    },
    [gamePlayers, supabase, user, activeGame]
  );

  const endGame: IGame["endGame"] = useCallback(async () => {
    return supabase
      .from("games")
      .update({ is_active: false })
      .eq("creator", user.id)
      .eq("id", activeGame)
      .then(({ error }) => {
        if (error) throw new Error(error.message);
        setActiveGame(null);
        return null;
      });
  }, [activeGame, user, supabase]);

  const getOngoingGame = useCallback(async () => {
    return supabase
      .from("games")
      .select("*")
      .eq("is_active", true)
      .contains("players", [user.id])
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        if (data?.[0]) {
          setGamePlayers(data[0].players);
          setActiveGame(data[0].id);
          setIsGameCreator(data[0].creator === user.id);
        }
        return data[0];
      });
  }, [supabase, user]);

  const leaveGame = useCallback(async () => {
    const updatedPlayers = [...gamePlayers];
    const playerIdx = updatedPlayers.findIndex((id) => id === user.id);
    updatedPlayers.splice(playerIdx, 1);

    return supabase
      .from("games")
      .update({ players: updatedPlayers })
      .eq("id", activeGame)
      .contains("players", [user.id])
      .then(({ error }) => {
        if (error) throw new Error(error.message);
        setGamePlayers(defaultContext.gamePlayers);
        setActiveGame(defaultContext.activeGame);
        setIsGameCreator(defaultContext.isGameCreator);
        return null;
      });
  }, [activeGame, supabase, user, gamePlayers]);

  useLayoutEffect(() => {
    // todo: setup subscription to games table changes
    if (!loadedGame) {
      getOngoingGame().then(() => {
        setLoadedGame(true);
      });
    }
  }, [loadedGame, getOngoingGame]);

  // start game
  // - deck.id        []

  // restart game
  // - reshuffle all decks
  // - reset all life
  // - if variant redeal identity cards
  return (
    <GameContext.Provider
      value={{
        activeGame,
        gamePlayers,
        isGameCreator,
        endGame,
        startGame,
        addFriendToGame,
        leaveGame,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
