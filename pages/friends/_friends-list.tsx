import Link from "next/link";
import { useCallback } from "react";
import { useFriendsContext, useGameContext } from "../../context";
import type { IFriendProfile } from "../../utils/types";
import MutualFriend from "./_mutual-friend";

export default function FriendsList() {
  const { activeGame, isInGame } = useGameContext();
  const { approveFriend, requestedFriends, mutualFriends, pendingFriends } =
    useFriendsContext();

  const handleApproveRequest = useCallback(
    (profile: IFriendProfile) => {
      approveFriend(profile);
    },
    [approveFriend]
  );

  // const handleAddFriendToGame = useCallback(
  //   (profileId: IFriendProfile["id"]) => {
  //     console.log(`handle add friend ${profileId}`);
  //     addFriendToGame(profileId);
  //   },
  //   [addFriendToGame]
  // );

  return (
    <div id="friends-list">
      <h3>List</h3>
      <p>
        <Link href="/friends/find">Find friends</Link>
      </p>
      <h4>Mutual Friends</h4>
      {mutualFriends?.length ? (
        <ul>
          {mutualFriends.map((friend) => (
            <MutualFriend key={friend.id} {...friend} />
          ))}
        </ul>
      ) : (
        <p>No friends, go find some</p>
      )}

      <h4>Awaiting Your Approval</h4>
      {pendingFriends?.length ? (
        <ul>
          {pendingFriends.map((friend) => (
            <li key={friend.id}>
              {friend.username} &mdash;{" "}
              {/* <button type="button" onClick={() => handleRejectRequest(friend)}>
                Deny
              </button> */}
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
              {friend.username}
              {/* &mdash;{" "} */}
              {/* <button
                type="button"
                onClick={() => handleRejectRequest(friend)}>
                Cancel friend request
              </button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
}
