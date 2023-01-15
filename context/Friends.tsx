import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import type { Friend, IFriendProfile } from "../utils/types";
import { useProfileContext } from "./Profile";
import { useSupabaseContext } from "./Supabase";

interface IFriends {
  currentFriends: IFriendProfile[];
  pendingFriends: IFriendProfile[];
  requestedFriends: IFriendProfile[];
  searchFriend: (searchValue: string) => Promise<IFriendProfile | null>;
  requestFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  approveFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  cancelFriendRequest: (profile: IFriendProfile) => Promise<boolean>;
  isProfileCurrentFriend: (id: IFriendProfile["id"]) => boolean;
  isProfileRequestedFriend: (id: IFriendProfile["id"]) => boolean;
  isProfilePendingFriend: (id: IFriendProfile["id"]) => boolean;
}

const defaultContext: IFriends = {
  currentFriends: [],
  pendingFriends: [],
  requestedFriends: [],
  searchFriend: () => Promise.resolve(null),
  requestFriend: () => Promise.resolve(null),
  approveFriend: () => Promise.resolve(null),
  cancelFriendRequest: () => Promise.resolve(false),
  isProfileCurrentFriend: () => false,
  isProfileRequestedFriend: () => false,
  isProfilePendingFriend: () => false,
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
  const [currentFriends, setCurrentFriends] = useState(
    defaultContext.currentFriends
  );
  const [requestedFriends, setRequestedFriends] = useState(
    defaultContext.requestedFriends
  );

  const rehydrateFriends = useCallback(() => {
    setPendingFriends(defaultContext.pendingFriends);
    setCurrentFriends(defaultContext.currentFriends);
    setRequestedFriends(defaultContext.requestedFriends);
    setLoadedFriends(false);
  }, [
    setPendingFriends,
    setCurrentFriends,
    setRequestedFriends,
    setLoadedFriends,
  ]);

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
          friend_id: "",
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
          accepter: id,
          requester: user.id,
          pending: true,
        })
        .select()
        .then(async ({ data, error }) => {
          if (error) throw new Error(error.message);
          const newFriend: IFriendProfile = await getProfile(id).then(
            (profile) =>
              ({
                username: profile?.username,
                id,
                friend_id: data[0].id,
              } as IFriendProfile)
          );

          setRequestedFriends((requested) => [...requested, newFriend]);
          return newFriend;
        });
    },
    [supabase, user]
  );

  const getFriends = useCallback(async () => {
    const { data, error } = await supabase
      .from("friends")
      .select("*")
      .eq("rejected", false)
      .or(`requester.eq.${user.id},accepter.eq.${user.id}`);

    if (error) throw new Error(error.message);

    return data.map((friend: Friend) => {
      const profileId =
        friend.accepter === user.id ? friend.requester : friend.accepter;
      const addingFriendFnc =
        friend.accepter === user.id ? setPendingFriends : setRequestedFriends;
      const setFriendFnc = friend.pending ? addingFriendFnc : setCurrentFriends;

      getProfile(profileId).then((profile) => {
        if (profile) {
          setFriendFnc((frnd) => [
            ...frnd,
            {
              username: profile.username,
              id: profile.id,
              friend_id: friend.id,
            },
          ]);
        }
      });
    });
  }, [supabase, user]);

  const approveFriend = useCallback(async (profile: IFriendProfile) => {
    return supabase
      .from("friends")
      .update({
        pending: false,
      })
      .eq("id", profile.friend_id)
      .select()
      .then(({ error }) => {
        if (error) throw new Error(error.message);
        setCurrentFriends((current) => [...current, profile]);
        setPendingFriends((pending) => {
          const pendingIdx = pending.findIndex(
            (p) => p.friend_id === profile.friend_id
          );
          if (pendingIdx < 0) return pending;
          pending.splice(pendingIdx, 1);
          return pending;
        });
        return profile;
      });
  }, []);

  const cancelFriendRequest = useCallback(
    async (profile: IFriendProfile) => {
      return supabase
        .from("friends")
        .update({
          id: profile.friend_id,
          pending: false,
          rejected: true,
        })
        .eq("id", profile.friend_id)
        .select()
        .then(({ error }) => {
          if (error) throw new Error(error.message);
          rehydrateFriends();
          return true;
        });
    },
    [supabase, rehydrateFriends]
  );

  const isProfileCurrentFriend = useCallback(
    (profileId: IFriendProfile["id"]): boolean =>
      currentFriends.filter((friend) => friend.id === profileId).length > 0,
    [currentFriends]
  );

  const requestedFriendIndex = useCallback(
    (profileId: IFriendProfile["id"]): number => {
      return requestedFriends.findIndex((friend) => friend.id === profileId);
    },
    [requestedFriends]
  );
  const isProfileRequestedFriend = useCallback(
    (profileId: IFriendProfile["id"]): boolean =>
      requestedFriendIndex(profileId) >= 0,
    [requestedFriendIndex]
  );

  const pendingFriendIndex = useCallback(
    (profileId: IFriendProfile["id"]): number => {
      return pendingFriends.findIndex((friend) => friend.id === profileId);
    },
    [pendingFriends]
  );
  const isProfilePendingFriend = useCallback(
    (profileId: IFriendProfile["id"]): boolean => {
      return pendingFriendIndex(profileId) >= 0;
    },
    [pendingFriendIndex]
  );

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
        currentFriends,
        pendingFriends,
        requestedFriends,
        approveFriend,
        searchFriend,
        requestFriend,
        isProfileCurrentFriend,
        isProfileRequestedFriend,
        isProfilePendingFriend,
        cancelFriendRequest,
      }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriendsContext() {
  return useContext(FriendsContext);
}
