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
    isProfileCurrentFriend,
    isProfileRequestedFriend,
    isProfilePendingFriend,
  } = useFriendsContext();

  const handleAddFriend = useCallback(() => {
    if (foundProfile) {
      if (isProfilePendingFriend(foundProfile.id)) {
        approveFriend(foundProfile);
      } else {
        requestFriend(foundProfile);
      }
    }
  }, [requestFriend, foundProfile]);

  const disabledButton = useMemo(() => {
    if (!foundProfile) return false;
    if (
      isProfileCurrentFriend(foundProfile.id) ||
      isProfileRequestedFriend(foundProfile.id)
    )
      return true;

    return false;
  }, [foundProfile, isProfileCurrentFriend, isProfileRequestedFriend]);

  const buttonText = useMemo(() => {
    if (!foundProfile) return "Add Friend";
    if (isProfileCurrentFriend(foundProfile.id)) return "Already Friends";
    if (isProfileRequestedFriend(foundProfile.id)) return "Pending Request";
    if (isProfilePendingFriend(foundProfile.id)) return "Approve Request";

    return "Add Friend";
  }, [
    foundProfile,
    isProfileCurrentFriend,
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
