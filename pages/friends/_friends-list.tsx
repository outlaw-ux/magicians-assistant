import { useFriendsContext } from "../../context";

export default function FriendsList() {
  const { getFriends } = useFriendsContext();
  return (
    <div id="friends-list">
      <h3>List</h3>

      <ul>
        <li>Friend Name</li>
      </ul>
    </div>
  );
}
