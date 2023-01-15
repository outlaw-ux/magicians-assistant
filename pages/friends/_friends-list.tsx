import Link from "next/link";
import { useCallback } from "react";
import { useFriendsContext, useGameContext } from "../../context";
import type { IFriendProfile } from "../../utils/types";

export default function FriendsList() {
  const { activeGame, gamePlayers, addFriendToGame } = useGameContext();
  const {
    approveFriend,
    requestedFriends,
    currentFriends,
    pendingFriends,
    cancelFriendRequest,
  } = useFriendsContext();

  const handleRejectRequest = (profile: IFriendProfile) => {
    cancelFriendRequest(profile);
  };
  const handleApproveRequest = (profile: IFriendProfile) => {
    approveFriend(profile);
  };

  const isFriendInGame = useCallback(
    (profileId: IFriendProfile["id"]) => {
      return gamePlayers.includes(profileId);
    },
    [gamePlayers]
  );
  const handleAddFriendToGame = useCallback(
    (profileId: IFriendProfile["id"]) => {
      addFriendToGame(profileId);
    },
    [gamePlayers, addFriendToGame]
  );

  return (
    <div id="friends-list">
      <h3>List</h3>
      <p>
        <Link href="/friends/find">Find friends</Link>
      </p>
      <h4>Current Friends</h4>
      {currentFriends?.length ? (
        <ul>
          {currentFriends.map((friend) => (
            <li key={friend.id}>
              {friend.username} &mdash;{" "}
              {activeGame ? (
                <button
                  type="button"
                  disabled={isFriendInGame(friend.id)}
                  onClick={() => handleAddFriendToGame(friend.id)}>
                  {isFriendInGame(friend.id) ? "In Game" : "Add to Game"}
                </button>
              ) : (
                <em>Start Game to add players</em>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends, go find some</p>
      )}
      <h4>Awaiting Your Aproval</h4>
      {pendingFriends?.length ? (
        <ul>
          {pendingFriends.map((friend) => (
            <li key={friend.id}>
              {friend.username} &mdash;{" "}
              <button type="button" onClick={() => handleRejectRequest(friend)}>
                Deny
              </button>
              <button
                type="button"
                onClick={() => handleApproveRequest(friend)}>
                Approve
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending friends</p>
      )}

      <h4>Your Requests</h4>
      {requestedFriends?.length ? (
        <ul>
          {requestedFriends.map((friend) => (
            <li key={friend.id}>
              {friend.username} &mdash;{" "}
              <button type="button" onClick={() => handleRejectRequest(friend)}>
                Cancel friend request
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
}
