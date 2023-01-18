import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useGameContext, useProfileContext } from "../context";
import { useSupabaseContext } from "../context/Supabase";

export default function Navigation() {
  const router = useRouter();
  const { supabase } = useSupabaseContext();
  const { username } = useProfileContext();

  return (
    <div id="account-page">
      <ul>
        {username === "kyle" && (
          <>
            <li>
              <Link href="/attractions">Attractions</Link>
            </li>
            <li>
              <Link href="/schemes">Schemes</Link>
            </li>
            <li>
              <Link href="/friends">Friends</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/game">Play Game</Link>
        </li>

        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>

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
