import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";
import type { Friend, IFriendProfile } from "../utils/types";
import { useProfileContext } from "./Profile";
import { useSupabaseContext } from "./Supabase";

interface IFriends {
  // currentFriends: IFriendProfile[];
  pendingFriends: IFriendProfile[];
  // requestedFriends: IFriendProfile[];
  searchFriend: (searchValue: string) => Promise<IFriendProfile | null>;
  requestFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  // approveFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  // cancelFriendRequest: (profile: IFriendProfile) => Promise<boolean>;
  // isProfileCurrentFriend: (id: IFriendProfile["id"]) => boolean;
  // isProfileRequestedFriend: (id: IFriendProfile["id"]) => boolean;
  // isProfilePendingFriend: (id: IFriendProfile["id"]) => boolean;
}

const defaultContext: IFriends = {
  // currentFriends: [],
  pendingFriends: [],
  // requestedFriends: [],
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
  const { getProfile } = useProfileContext();
  const [loadedFriends, setLoadedFriends] = useState(false);
  const [pendingFriends, setPendingFriends] = useState(
    defaultContext.pendingFriends
  );
  // const [currentFriends, setCurrentFriends] = useState(
  //   defaultContext.currentFriends
  // );
  // const [requestedFriends, setRequestedFriends] = useState(
  //   defaultContext.requestedFriends
  // );

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
          const newFriend: IFriendProfile = await getProfile(id).then(
            (profile) =>
              ({
                username: profile?.username,
                id,
              } as IFriendProfile)
          );
          console.log("requeste friend", newFriend);
          // setRequestedFriends((requested) => [...requested, newFriend]);
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

    console.log(data);
    // setPendingFriends(data.pendingFriends);
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

  // const isProfileCurrentFriend = useCallback(
  //   (profileId: IFriendProfile["id"]): boolean =>
  //     currentFriends.filter((friend) => friend.id === profileId).length > 0,
  //   [currentFriends]
  // );

  // const isProfileRequestedFriend = useCallback(
  //   (profileId: IFriendProfile["id"]): boolean =>
  //     requestedFriends.filter((friend) => friend.id === profileId).length > 0,
  //   [requestedFriends]
  // );

  // const isProfilePendingFriend = useCallback(
  //   (profileId: IFriendProfile["id"]): boolean =>
  //     pendingFriends.filter((friend) => friend.id === profileId).length > 0,
  //   [pendingFriends]
  // );

  // useLayoutEffect(() => {
  //   if (!loadedFriends) {
  //     getFriends().then(() => {
  //       setLoadedFriends(true);
  //     });
  //   }
  // }, [loadedFriends]);

  useLayoutEffect(() => {
    if (!loadedFriends) {
      getFriends();
    }
  }, [loadedFriends]);

  return (
    <FriendsContext.Provider
      value={{
        // currentFriends,
        pendingFriends,
        // requestedFriends,
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
