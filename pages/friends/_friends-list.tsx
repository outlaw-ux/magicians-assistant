import Link from "next/link";
import { useFriendsContext } from "../../context";

export default function FriendsList() {
  const { requestedFriends, currentFriends, pendingFriends } =
    useFriendsContext();

  return (
    <div id="friends-list">
      <h3>List</h3>
      <p>
        <Link href="/friends/find">Find friends</Link>
      </p>

      {currentFriends?.length ? (
        <ul>
          {currentFriends.map((friend) => (
            <li key={friend.profile_id}>
              {friend.username} &mdash;{" "}
              <button type="button">Add to Game Table</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends, go find some</p>
      )}

      {pendingFriends?.length ? (
        <ul>
          {pendingFriends.map((friend) => (
            <li key={friend.profile_id}>
              {friend.username} &mdash; <button type="button">Deny</button>
              <button type="button">Approve</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending friends</p>
      )}

      {requestedFriends?.length ? (
        <ul>
          {requestedFriends.map((friend) => (
            <li key={friend.profile_id}>
              {friend.username} &mdash;{" "}
              <button type="button">Cancel friend request</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
}
