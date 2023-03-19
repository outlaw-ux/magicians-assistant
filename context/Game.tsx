import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import type { Game, IFriendProfile, IGameRequest } from "../utils/types";
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
  leaveGame: () => Promise<null>;
}

const defaultContext: IGame = {
  activeGame: null,
  isGameCreator: false,
  isInGame: () => Promise.resolve(false),
  isInvitedToActiveGame: () => Promise.resolve(false),
  addToGame: () => Promise.resolve(),
  createGame: () => Promise.resolve(null),
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

  const createGame: IGame["createGame"] = useCallback(
    async ({ startingLife, players, variant }) => {
      const { data: newGame, error: newGameError } = await supabase
        .from("games")
        .insert({
          variant,
          starting_life: startingLife,
          active: true,
          creator_id: user.id,
        })
        .select("*");

      if (newGameError) throw new Error(newGameError.message);

      const gameId = newGame[0].id;

      const playerData = players.map((playerId) => ({
        game_id: gameId,
        profile_id: playerId,
      }));
      playerData.push({ game_id: gameId, profile_id: user.id });

      await supabase
        .from("game_invites")
        .insert(playerData)
        .then(({ error }) => {
          if (error) throw new Error(error.message);
        });

      setActiveGame(gameId);
      setIsGameCreator(true);
      return gameId;
    },
    [user]
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
      .select(
        `
          id,
          creator_id,
          game_invites (
            game_id, profile_id
          )
        `
      )
      .match({
        "game_invites.profile_id": user.id,
        active: true,
      })
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        console.log({ data });

        let gameId, creatorId;

        if (data?.[0] && data?.[0].game_invites) {
          creatorId = data?.[0].creator_id;

          if (Array.isArray(data?.[0].game_invites)) {
            gameId = data?.[0].game_invites?.[0]?.game_id;
          } else {
            gameId = data?.[0].game_invites.game_id;
          }

          setActiveGame(gameId);
          setIsGameCreator(creatorId === user.id);
        }

        return gameId;
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

  const leaveGame = useCallback(async () => {
    const leaveGame = await supabase
      .from("game_invites")
      .delete()
      .eq("profile_id", user.id)
      .then(({ error }) => {
        if (error) throw new Error(error.message);

        setActiveGame(null);

        return null;
      });

    return leaveGame;
  }, [user]);

  useLayoutEffect(() => {
    if (!loadedGame) {
      getOngoingGame().then(() => {
        setLoadedGame(true);
      });
    }
  }, [loadedGame, getOngoingGame]);

  useEffect(() => {
    const gameInvitationChannel = supabase
      .channel("game-invitation")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "game_invites",
          filter: `profile_id=eq.${user.id}`,
        },
        async (payload) => {
          setActiveGame(payload.new.game_id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gameInvitationChannel);
    };
  }, [supabase, user]);

  useEffect(() => {
    const gameEndedChannel = supabase
      .channel("game-ended")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `id=eq.${activeGame}`,
        },
        async (payload) => {
          if (!payload.new.active) {
            setActiveGame(null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gameEndedChannel);
    };
  }, [supabase, activeGame]);

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
        leaveGame,
      }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
