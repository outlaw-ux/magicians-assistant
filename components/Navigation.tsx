import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function Navigation() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <>
      {user && (
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/schemes">Archenemy Schemes</Link>
          </li>
          <li>
            Unfinity
            <ul>
              <li>
                <Link href="/attractions">Attractions</Link>
              </li>
              <li>
                <Link href="/stickers">Stickers</Link>
              </li>
            </ul>
          </li>
          {/* <li>
          <Link href="/counters">Counter Manager</Link>
        </li> */}
          <li>
            <Link href="/tokens">Token Manager</Link>
          </li>
          <li>
            <Link href="/dice-roller">Dice Roller</Link>
          </li>
          <li>
            <Link href="/life-tracker">Life Tracker</Link>
          </li>
          {/* <li>
          <Link href="/treachery">Treachery</Link>
        </li> */}
        </ul>
      )}

      <ul>
        {user ? (
          <li>
            <Link href="/" onClick={() => supabaseClient.auth.signOut()}>
              Sign Out
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>

      <hr />
    </>
  );
}
