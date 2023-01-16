import Navigation from "../../components/Navigation";
import FriendsList from "./_friends-list";

export default function FriendsPage() {
  return (
    <div id="friends-page">
      <Navigation />
      <h2>Friends</h2>

      <FriendsList />
    </div>
  );
}
