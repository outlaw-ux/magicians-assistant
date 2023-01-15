import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import type { IFriendProfile } from "../utils/types";
import { useProfileContext } from "./Profile";
import { useSupabaseContext } from "./Supabase";

interface IFriends {
  currentFriends: IFriendProfile[];
  pendingFriends: IFriendProfile[];
  requestedFriends: IFriendProfile[];
  searchFriend: (searchValue: string) => Promise<IFriendProfile | null>;
  requestFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
  approveFriend: (profile: IFriendProfile) => Promise<IFriendProfile | null>;
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
      // todo: gotta make sure nothing is already pending
      return supabase
        .from("friends")
        .insert({
          accepter: id,
          requester: user.id,
          pending: true,
        })
        .select()
        .then(({ error }) => {
          if (error) throw new Error(error.message);
          return {
            username: "",
            id,
          };
        });
    },
    [supabase, user]
  );

  const getFriends = useCallback(async () => {
    const { data, error } = await supabase
      .from("friends")
      .select("*")
      .or(`requester.eq.${user.id},accepter.eq.${user.id}`);

    if (error) throw new Error(error.message);

    return data.map((friend) => {
      const profileId =
        friend.accepter === user.id ? friend.requester : friend.accepter;
      const addingFriendFnc =
        friend.accepter === user.id ? setPendingFriends : setRequestedFriends;
      const setFriendFnc = friend.pending ? addingFriendFnc : setCurrentFriends;

      getProfile(profileId).then((profile) => {
        if (profile) {
          setFriendFnc((friend) => [
            ...friend,
            { username: profile.username, id: profile.id },
          ]);
        }
      });
    });
  }, [supabase, user]);

  const approveFriend = useCallback(async () => {
    return Promise.resolve(null);
  }, []);

  const isProfileCurrentFriend = useCallback(
    (profileId: IFriendProfile["id"]): boolean =>
      currentFriends.filter((friend) => friend.id === profileId).length > 0,
    [currentFriends]
  );

  const isProfileRequestedFriend = useCallback(
    (profileId: IFriendProfile["id"]): boolean =>
      requestedFriends.filter((friend) => friend.id === profileId).length > 0,
    [requestedFriends]
  );

  const isProfilePendingFriend = useCallback(
    (profileId: IFriendProfile["id"]): boolean =>
      pendingFriends.filter((friend) => friend.id === profileId).length > 0,
    [pendingFriends]
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
      }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriendsContext() {
  return useContext(FriendsContext);
}
