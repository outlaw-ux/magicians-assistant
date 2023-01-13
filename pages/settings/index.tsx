import EditProfile from "../../components/EditProfile";
import Navigation from "../../components/Navigation";

export default function SettingsPage() {
  return (
    <div id="settings-page">
      <Navigation />
      <h2>Settings</h2>

      <EditProfile />
    </div>
  );
}
