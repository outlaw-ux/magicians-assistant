import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import Navigation from "../../components/Navigation";
import { useFriendsContext } from "../../context";
import type { IFriendProfile } from "../../utils/types";
import AddFriend from "./_add-friend";

export default function FindFriendsPage() {
  const { searchFriend } = useFriendsContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [foundFriend, setFoundFriend] = useState<IFriendProfile | null>(null);
  const [debouncedSearchValue] = useDebounce(searchValue, 150);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchValue(value);
    },
    [setSearchValue]
  );

  useLayoutEffect(() => {
    searchFriend(debouncedSearchValue).then((newFriend) => {
      setFoundFriend(newFriend);
    });
  }, [debouncedSearchValue, setFoundFriend, searchFriend]);

  return (
    <div id="find-friends-page">
      <Navigation />
      <h2>Find Friends</h2>

      <input type="text" value={searchValue} onChange={handleSearch} />

      {searchValue && <AddFriend foundProfile={foundFriend} />}
    </div>
  );
}
