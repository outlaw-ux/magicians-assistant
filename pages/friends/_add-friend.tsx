import React, { useCallback, useMemo } from "react";
import { useFriendsContext } from "../../context";
import type { IFriendProfile } from "../../utils/types";

export default function AddFriend({
  foundProfile,
}: {
  foundProfile: IFriendProfile | null;
}) {
  const {
    approveFriend,
    requestFriend,
    pendingFriends,
    requestedFriends,
    mutualFriends,
  } = useFriendsContext();

  const isProfilePendingFriend = useMemo(() => {
    return (
      pendingFriends.filter(({ id }) => id === foundProfile?.id).length > 0
    );
  }, [foundProfile, pendingFriends]);
  const isProfileRequestedFriend = useMemo(() => {
    return (
      requestedFriends.filter(({ id }) => id === foundProfile?.id).length > 0
    );
  }, [foundProfile, requestedFriends]);
  const isProfileMutualFriend = useMemo(() => {
    return mutualFriends.filter(({ id }) => id === foundProfile?.id).length > 0;
  }, [foundProfile, mutualFriends]);

  const handleAddFriend = useCallback(() => {
    if (foundProfile) {
      if (isProfilePendingFriend) {
        approveFriend(foundProfile);
      } else {
        requestFriend(foundProfile);
      }
    }
  }, [requestFriend, foundProfile]);

  const disabledButton = useMemo(() => {
    if (!foundProfile) return false;

    return isProfileRequestedFriend || isProfileMutualFriend;
  }, [
    foundProfile,
    isProfileMutualFriend,
    isProfileRequestedFriend,
    isProfilePendingFriend,
  ]);

  const buttonText = useMemo(() => {
    if (!foundProfile) return "Add Friend";
    if (isProfileMutualFriend) return "Already Friends";
    if (isProfileRequestedFriend) return "Pending Request";
    if (isProfilePendingFriend) return "Approve Request";

    return "Add Friend";
  }, [
    foundProfile,
    isProfileMutualFriend,
    isProfileRequestedFriend,
    isProfilePendingFriend,
  ]);

  return (
    <div id="add-friend">
      {foundProfile ? (
        <p>
          Found User: {foundProfile.username} &mdash;{" "}
          <button
            type="button"
            onClick={handleAddFriend}
            disabled={disabledButton}>
            {buttonText}
          </button>
        </p>
      ) : (
        <p>No user with that name</p>
      )}
    </div>
  );
}
