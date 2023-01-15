import Link from "next/link";
import { useFriendsContext } from "../../context";
import type { IFriendProfile } from "../../utils/types";

export default function FriendsList() {
  const {
    requestedFriends,
    currentFriends,
    pendingFriends,
    cancelFriendRequest,
  } = useFriendsContext();

  const handleRejectRequest = (profile: IFriendProfile) => {
    cancelFriendRequest(profile);
  };

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
              <button type="button">Add to Game Table</button>
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
              <button type="button">Approve</button>
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
