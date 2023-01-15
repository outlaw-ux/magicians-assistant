import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useGameContext } from "../context";
import { useSupabaseContext } from "../context/Supabase";

export default function Navigation() {
  const router = useRouter();
  const { activeGame, endGame, isGameCreator, startGame, leaveGame } =
    useGameContext();
  const { supabase } = useSupabaseContext();

  const handleGame = useCallback(() => {
    const toggleGame = !!activeGame ? endGame : startGame;
    toggleGame();
  }, [activeGame, endGame, startGame]);

  return (
    <div id="account-page">
      <ul>
        <li>
          <Link href="/attractions">Attractions</Link>
        </li>
        <li>
          <Link href="/schemes">Schemes</Link>
        </li>
        <li>
          <Link href="/friends">Friends</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>

      <p>
        {!activeGame || isGameCreator ? (
          <button type="button" onClick={handleGame}>
            {!!activeGame ? "End Game" : "Start Game"}
          </button>
        ) : (
          <button type="button" onClick={leaveGame}>
            Leave Game
          </button>
        )}
      </p>

      <p>
        <button
          onClick={async () => {
            supabase && (await supabase.auth.signOut());
            router.push("/");
          }}>
          Logout
        </button>
      </p>
    </div>
  );
}
