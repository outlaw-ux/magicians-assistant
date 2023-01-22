import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
  PostgrestResponse,
} from "@supabase/supabase-js";
import type { Profile, IFriendProfile } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

interface IFriends {
  mutualFriends: Profile[];
  pendingFriends: Profile[];
  requestedFriends: Profile[];
  searchFriend: (searchValue: string) => Promise<IFriendProfile | null>;
  requestFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  approveFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
}

const defaultContext: IFriends = {
  mutualFriends: [],
  pendingFriends: [],
  requestedFriends: [],
  searchFriend: () => Promise.resolve(null),
  requestFriend: () => Promise.resolve(null),
  approveFriend: () => Promise.resolve(null),
};

const FriendsContext = createContext(defaultContext);

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const [loadedFriends, setLoadedFriends] = useState(false);
  const [pendingFriends, setPendingFriends] = useState<
    IFriends["pendingFriends"]
  >(defaultContext.pendingFriends);
  const [mutualFriends, setMutualFriends] = useState(
    defaultContext.mutualFriends
  );
  const [requestedFriends, setRequestedFriends] = useState(
    defaultContext.requestedFriends
  );

  const getProfile = useCallback(
    async (user_id: string): Promise<Profile> => {
      const { data, error }: PostgrestResponse<Profile> = await supabase.rpc(
        "get-profile",
        { user_id }
      );

      if (error) throw new Error(error.message);
      return Promise.resolve(data as unknown as Profile);
    },
    [supabase]
  );

  const searchFriend: IFriends["searchFriend"] = useCallback(
    async (searchValue: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,username")
        .eq("username", searchValue);

      if (error) throw new Error(error.message);
      if (data.length && data[0].id !== user.id) {
        return {
          username: data[0].username,
          id: data[0].id,
        };
      }
      return null;
    },
    [supabase]
  );

  const requestFriend = useCallback(
    async ({ id }: IFriendProfile) => {
      return supabase
        .from("friends")
        .insert({
          profile_one: user.id,
          profile_two: id,
        })
        .select()
        .then(async ({ error }) => {
          if (error) throw new Error(error.message);
          const newFriend = await getProfile(id);

          return newFriend;
        });
    },
    [supabase, user]
  );

  const approveFriend = useCallback(
    async ({ id }: IFriendProfile) => {
      return supabase
        .from("friends")
        .insert({
          profile_one: user.id,
          profile_two: id,
        })
        .select()
        .then(async ({ error }) => {
          if (error) throw new Error(error.message);
          const newFriend = await getProfile(id);

          return newFriend;
        });
    },
    [supabase, user]
  );

  const getFriends = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke(
      "requested-friends"
    );

    if (error instanceof FunctionsHttpError) {
      console.log("Function returned an error", error.message);
    } else if (error instanceof FunctionsRelayError) {
      console.log("Relay error:", error.message);
    } else if (error instanceof FunctionsFetchError) {
      console.log("Fetch error:", error.message);
    }

    if (data) {
      data.pendingFriends.forEach(async (user_id: Profile["id"]) => {
        const data = await getProfile(user_id);
        setPendingFriends((pending: Profile[]) => [...pending, data]);
      });

      data.requestedFriends.forEach(async (user_id: Profile["id"]) => {
        const data = await getProfile(user_id);
        setRequestedFriends((requested: Profile[]) => [...requested, data]);
      });

      data.mutualFriends.forEach(async (user_id: Profile["id"]) => {
        const data = await getProfile(user_id);
        setMutualFriends((mutual: Profile[]) => [...mutual, data]);
      });
    }

    return data;
  }, [supabase]);

  useLayoutEffect(() => {
    if (!loadedFriends) {
      getFriends().then(() => {
        setLoadedFriends(true);
      });
    }
  }, [loadedFriends]);

  useEffect(() => {
    const pendingFriendRequests = supabase
      .channel("pending-friend-requests")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friends",
          filter: `profile_two=eq.${user.id}`,
        },
        async (payload) => {
          if (payload.new && "profile_one" in payload.new) {
            const profileId = `${payload.new.profile_one}`;
            const pendingFriend = await getProfile(profileId);

            setPendingFriends((pending: Profile[]) => [
              ...pending,
              pendingFriend,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pendingFriendRequests);
    };
  }, [supabase, user]);

  useEffect(() => {
    const acceptedFriendRequest = supabase
      .channel("accepted-friend-request")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friends",
          filter: `profile_one=eq.${user.id}`,
        },
        async (payload) => {
          if (payload.new && "profile_two" in payload.new) {
            const profileId = `${payload.new.profile_two}`;
            const requestedFriend = await getProfile(profileId);

            setRequestedFriends((requested: Profile[]) => [
              ...requested,
              requestedFriend,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(acceptedFriendRequest);
    };
  }, [supabase, user]);

  useEffect(() => {
    const newMutuals: Profile[] = [];
    requestedFriends.forEach((friend) => {
      const potentialMutuals = pendingFriends.filter(
        (pending) => pending.id === friend.id
      );
      newMutuals.push(...potentialMutuals);
    });

    newMutuals.forEach((mutual) => {
      setPendingFriends((pending) => {
        const idx = pending.findIndex((p) => p.id === mutual.id);
        if (idx >= 0) pending.splice(idx, 1);
        return pending;
      });

      setRequestedFriends((requested) => {
        const idx = requested.findIndex((r) => r.id === mutual.id);
        if (idx >= 0) requested.splice(idx, 1);
        return requested;
      });
    });

    if (newMutuals.length) {
      setMutualFriends((mutuals: Profile[]) => [...mutuals, ...newMutuals]);
    }
  }, [requestedFriends, pendingFriends]);

  return (
    <FriendsContext.Provider
      value={{
        approveFriend,
        mutualFriends,
        pendingFriends,
        requestedFriends,
        searchFriend,
        requestFriend,
      }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriendsContext() {
  return useContext(FriendsContext);
}
