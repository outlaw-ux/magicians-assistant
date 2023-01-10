import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";

export default function Game() {
  const { user } = useSupabaseContext();

  return (
    <div id="account-page">
      <h2>Game Page</h2>

      <Navigation />

      <pre>{JSON.stringify(user, undefined, 2)}</pre>
    </div>
  );
}
