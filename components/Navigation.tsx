import Link from "next/link";
import { useRouter } from "next/router";
import { useSupabaseContext } from "../context/Supabase";

export default function Navigation() {
  const router = useRouter();
  const { supabase } = useSupabaseContext();

  return (
    <div id="account-page">
      <ul>
        <li>
          <Link href="/attractions">Attractions</Link>
        </li>
        <li>
          <Link href="/schemes">Schemes</Link>
        </li>
      </ul>

      <button
        onClick={async () => {
          supabase && (await supabase.auth.signOut());
          router.push("/");
        }}>
        Logout
      </button>
    </div>
  );
}
