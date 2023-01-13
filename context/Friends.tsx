import React, { createContext, useContext, useState } from "react";

interface IFriends {
  friends: { id: string }[];
}

const defaultContext: IFriends = {
  friends: [],
};

const FriendsContext = createContext(defaultContext);

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState(defaultContext.friends);
  // getFriends
  // addFriend
  // search
  // pendingFriends

  return (
    <FriendsContext.Provider value={{ friends }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriendsContext() {
  return useContext(FriendsContext);
}
