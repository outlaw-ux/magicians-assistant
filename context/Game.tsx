import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Game, IFriendProfile, IGameRequest } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

interface IGame {
  activeGame: Game["id"] | null;
  isGameCreator: boolean;
  isInGame: (id: IFriendProfile["id"]) => Promise<boolean>;
  isInvitedToActiveGame: (id: IFriendProfile["id"]) => Promise<boolean>;
  addToGame: (id: IFriendProfile["id"]) => Promise<void>;
  createGame: ({
    startingLife,
    players,
    variant,
  }: IGameRequest) => Promise<Game["id"] | null>;
  endGame: () => Promise<null>;
  // leaveGame: () => Promise<null>;
}

const defaultContext: IGame = {
  activeGame: null,
  isGameCreator: false,
  isInGame: () => Promise.resolve(false),
  isInvitedToActiveGame: () => Promise.resolve(false),
  addToGame: () => Promise.resolve(),
  createGame: () => Promise.resolve(null),
  endGame: () => Promise.resolve(null),
  // leaveGame: () => Promise.resolve(null),
};

const GameContext = createContext(defaultContext);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const [loadedGame, setLoadedGame] = useState(false);
  const [activeGame, setActiveGame] = useState(defaultContext.activeGame);
  const [isGameCreator, setIsGameCreator] = useState(false);

  const createGame: IGame["createGame"] = useCallback(
    async ({ startingLife, players, variant }) => {
      return supabase
        .from("games")
        .insert({
          variant,
          starting_life: startingLife,
          active: true,
          creator_id: user.id,
        })
        .select()
        .then(async ({ data, error }) => {
          if (error) throw error;

          const gameId = data[0].id;

          const playerData = players.map((playerId) => ({
            game_id: gameId,
            profile_id: playerId,
          }));
          playerData.push({ game_id: gameId, profile_id: user.id });

          await supabase
            .from("game_invites")
            .insert(playerData)
            .then(({ error }) => {
              if (error) throw error;
            });

          setActiveGame(gameId);
          setIsGameCreator(true);
          return gameId;
        });
    },
    []
  );

  const addToGame: IGame["addToGame"] = useCallback(
    async (id) => {
      return supabase
        .from("game_invites")
        .insert({ game_id: activeGame, profile_id: id })
        .then(({ error }) => {
          if (error) throw error;
        });
    },
    [supabase, user, activeGame]
  );

  const endGame: IGame["endGame"] = useCallback(async () => {
    return supabase
      .from("games")
      .update({ active: false })
      .eq("id", activeGame)
      .then(({ error }) => {
        if (error) throw error;
        setActiveGame(null);
        setIsGameCreator(false);
        return null;
      });
  }, [activeGame, user, supabase]);

  const getOngoingGame = useCallback(async () => {
    return supabase
      .from("games")
      .select("*")
      .eq("active", true)
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        if (data?.[0]) {
          setActiveGame(data[0].id);
          setIsGameCreator(data[0].creator_id === user.id);
        }
        return data[0];
      });
  }, [supabase, user]);

  const isInvitedToActiveGame: IGame["isInvitedToActiveGame"] = useCallback(
    async (friendId: IFriendProfile["id"]) => {
      console.log("isInvitedToActiveGame", activeGame);
      if (!activeGame) return false;

      const { data, error } = await supabase
        .from("games")
        .select(
          `
          id,
          game_invites (
            game_id
          )
        `
        )
        .match({
          "game_invites.profile_id": friendId,
          id: activeGame,
        });

      if (error) throw new Error(error.message);
      console.log("isInvitedToActiveGame", data);
      // return Promise.resolve(data as Partial<Game>);
      return Promise.resolve(data.length > 0);
    },
    [activeGame, supabase]
  );

  const isInGame: IGame["isInGame"] = useCallback(
    async (id) => {
      const gameInvites = await supabase
        .from("game_invites")
        .select("game_id")
        .eq("profile_id", id)
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);

          console.log("isInGame", data);

          return false;
        });

      return gameInvites;
    },
    [supabase]
  );

  // const leaveGame = useCallback(async () => {
  //   const updatedPlayers = [...[]];
  //   const playerIdx = updatedPlayers.findIndex((id) => id === user.id);
  //   updatedPlayers.splice(playerIdx, 1);

  //   return (
  //     supabase
  //       .from("games")
  //       .update({ players: updatedPlayers })
  //       .eq("id", activeGame)
  //       // .contains("players", [user.id])
  //       .then(({ error }) => {
  //         if (error) throw new Error(error.message);
  //         setActiveGame(defaultContext.activeGame);
  //         setIsGameCreator(defaultContext.isGameCreator);
  //         return null;
  //       })
  //   );
  // }, [activeGame, supabase, user]);

  useLayoutEffect(() => {
    // todo: setup subscription to games table changes
    if (!loadedGame) {
      getOngoingGame().then(() => {
        setLoadedGame(true);
      });
    }
  }, [loadedGame, getOngoingGame]);

  return (
    <GameContext.Provider
      value={{
        activeGame,
        isGameCreator,
        endGame,
        createGame,
        isInGame,
        addToGame,
        isInvitedToActiveGame,
        // leaveGame,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
