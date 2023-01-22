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
} from "@supabase/supabase-js";
import type { Profile, IFriendProfile } from "../utils/types";
import { useProfileContext } from "./Profile";
import { useSupabaseContext } from "./Supabase";

interface IFriends {
  mutualFriends: Profile[];
  pendingFriends: Profile[];
  requestedFriends: Profile[];
  searchFriend: (searchValue: string) => Promise<IFriendProfile | null>;
  requestFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  // approveFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  // cancelFriendRequest: (profile: IFriendProfile) => Promise<boolean>;
  // isProfileCurrentFriend: (id: IFriendProfile["id"]) => boolean;
  // isProfileRequestedFriend: (id: IFriendProfile["id"]) => boolean;
  // isProfilePendingFriend: (id: IFriendProfile["id"]) => boolean;
}

const defaultContext: IFriends = {
  mutualFriends: [],
  pendingFriends: [],
  requestedFriends: [],
  searchFriend: () => Promise.resolve(null),
  requestFriend: () => Promise.resolve(null),
  // approveFriend: () => Promise.resolve(null),
  // cancelFriendRequest: () => Promise.resolve(false),
  // isProfileCurrentFriend: () => false,
  // isProfileRequestedFriend: () => false,
  // isProfilePendingFriend: () => false,
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

  const getProfile = async (user_id: string): Profile => {
    const { data, error } = await supabase.rpc("get-profile", {
      user_id,
    });

    if (error) throw new Error(error.message);
    return data;
  };

  // const rehydrateFriends = useCallback(() => {
  //   setPendingFriends(defaultContext.pendingFriends);
  //   setCurrentFriends(defaultContext.currentFriends);
  //   setRequestedFriends(defaultContext.requestedFriends);
  //   setLoadedFriends(false);
  // }, [
  //   setPendingFriends,
  //   setCurrentFriends,
  //   setRequestedFriends,
  //   setLoadedFriends,
  // ]);

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
        .then(async ({ data, error }) => {
          if (error) throw new Error(error.message);
          const newFriend = await getProfile(id);

          setRequestedFriends((requested) => [...requested, newFriend]);
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
        setPendingFriends((pending: string[]) => [...pending, data]);
      });

      data.requestedFriends.forEach(async (user_id: Profile["id"]) => {
        const data = await getProfile(user_id);
        setRequestedFriends((requested: string[]) => [...requested, data]);
      });

      data.mutualFriends.forEach(async (user_id: Profile["id"]) => {
        const data = await getProfile(user_id);
        setMutualFriends((mutual: string[]) => [...mutual, data]);
      });
    }

    return data;
  }, [supabase]);

  // const approveFriend = useCallback(async (profile: IFriendProfile) => {
  //   return supabase
  //     .from("friends")
  //     .update({
  //       pending: false,
  //     })
  //     .eq("id", profile.friend_id)
  //     .select()
  //     .then(({ error }) => {
  //       if (error) throw new Error(error.message);
  //       setCurrentFriends((current) => [...current, profile]);
  //       setPendingFriends((pending) => {
  //         const pendingIdx = pending.findIndex(
  //           (p) => p.friend_id === profile.friend_id
  //         );
  //         if (pendingIdx < 0) return pending;
  //         pending.splice(pendingIdx, 1);
  //         return pending;
  //       });
  //       return profile;
  //     });
  // }, []);

  // const cancelFriendRequest = useCallback(
  //   async (profile: IFriendProfile) => {
  //     return supabase
  //       .from("friends")
  //       .update({
  //         id: profile.friend_id,
  //         pending: false,
  //         rejected: true,
  //       })
  //       .eq("id", profile.friend_id)
  //       .select()
  //       .then(({ error }) => {
  //         if (error) throw new Error(error.message);
  //         rehydrateFriends();
  //         return true;
  //       });
  //   },
  //   [supabase, rehydrateFriends]
  // );

  useLayoutEffect(() => {
    if (!loadedFriends) {
      getFriends().then(() => {
        setLoadedFriends(true);
      });
    }
  }, [loadedFriends]);

  return (
    <FriendsContext.Provider
      value={{
        mutualFriends,
        pendingFriends,
        requestedFriends,
        // approveFriend,
        searchFriend,
        requestFriend,
        // isProfileCurrentFriend,
        // isProfileRequestedFriend,
        // isProfilePendingFriend,
        // cancelFriendRequest,
      }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriendsContext() {
  return useContext(FriendsContext);
}
