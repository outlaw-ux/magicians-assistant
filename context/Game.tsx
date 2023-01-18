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
  activeGame: Game | null;
  isGameCreator: boolean;
  addFriendToGame: (friendId: Profile["id"]) => Promise<Game | null>;
  startGame: ({
    playerList,
    startingLife,
    type,
    variant,
  }: {
    playerList: Game["players"];
    startingLife: Game["starting_life"];
    type: Game["game_type"];
    variant: Game["variant"];
  }) => Promise<Game | null>;
  endGame: () => Promise<null>;
  leaveGame: () => Promise<null>;
}

const defaultContext: IGame = {
  activeGame: null,
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
  const [isGameCreator, setIsGameCreator] = useState(false);

  const startGame: IGame["startGame"] = useCallback(
    async ({ playerList, startingLife, type, variant }) => {
      if (activeGame) return Promise.resolve(activeGame);

      return supabase
        .from("games")
        .insert({
          creator: user.id,
          is_active: true,
          players: [...playerList, user.id],
          starting_life: startingLife,
          game_type: type,
          variant,
        })
        .select()
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          setActiveGame(data[0]);
          setIsGameCreator(true);
          return data[0];
        });
    },
    [activeGame, supabase, user]
  );

  const addFriendToGame: IGame["addFriendToGame"] = useCallback(
    async (friendId) => {
      if (!activeGame) return Promise.resolve(null);
      const updatedPlayers = [...activeGame.players, friendId];
      return supabase
        .from("games")
        .update({ players: updatedPlayers })
        .eq("id", activeGame.id)
        .select()
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          setActiveGame((game) =>
            game ? { ...game, players: updatedPlayers } : null
          );
          return data?.[0];
        });
    },
    [supabase, user, activeGame]
  );

  const endGame: IGame["endGame"] = useCallback(async () => {
    if (!activeGame) return Promise.resolve(activeGame);
    return supabase
      .from("games")
      .update({ is_active: false })
      .eq("creator", user.id)
      .eq("id", activeGame.id)
      .then(({ error }) => {
        if (error) throw new Error(error.message);
        setActiveGame(null);
        return null;
      });
  }, [activeGame, user, supabase]);

  const getOngoingGame = useCallback(async () => {
    if (activeGame) return Promise.resolve(activeGame);

    // supabase
    //   .channel("game-channel")
    //   .on(
    //     "postgres_changes",
    //     {
    //       event: "*",
    //       schema: "public",
    //       table: "games",
    //       filter: `is_active=eq.true`,
    //     },
    //     (payload) => {
    //       console.log("Change received!", payload);
    //     }
    //   )
    //   .subscribe();

    return supabase
      .from("games")
      .select("*")
      .eq("is_active", true)
      .contains("players", [user.id])
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        if (data?.[0]) {
          setActiveGame(data[0]);
          setIsGameCreator(data[0].creator === user.id);
        }
        return data[0];
      });
  }, [supabase, user]);

  const leaveGame = useCallback(async () => {
    const updatedPlayers = [...(activeGame?.players || [])];
    const playerIdx = updatedPlayers.findIndex((id) => id === user.id);
    updatedPlayers.splice(playerIdx, 1);

    return supabase
      .from("games")
      .update({ players: updatedPlayers })
      .eq("id", activeGame)
      .contains("players", [user.id])
      .then(({ error }) => {
        if (error) throw new Error(error.message);
        setActiveGame(defaultContext.activeGame);
        setIsGameCreator(defaultContext.isGameCreator);
        return null;
      });
  }, [activeGame, supabase, user]);

  useLayoutEffect(() => {
    // todo: setup subscription to games table changes
    if (!loadedGame) {
      getOngoingGame().then(() => {
        setLoadedGame(true);
      });
    }
  }, [loadedGame, getOngoingGame]);

  // subscribe to table changes
  // restart game
  // - reshuffle all decks
  // - reset all life
  // - if variant redeal identity cards
  return (
    <GameContext.Provider
      value={{
        activeGame,
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
