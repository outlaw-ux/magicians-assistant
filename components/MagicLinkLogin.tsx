import type { SupabaseClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import type { RedirectTo } from "@supabase/auth-ui-react/dist/esm/src/types";

function MagicLink({
  supabaseClient,
  redirectTo,
}: {
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
}) {
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: email || "",
      options: { emailRedirectTo: redirectTo },
    });
    if (error) setError(error.message);
    else setMessage("Check your email for the magic link");
    setLoading(false);
  };

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <div>
        <div>
          <div>
            <label>Magic Link Login</label>
            <input
              type="email"
              placeholder="email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <button type="submit" disabled={loading}>
            Sign In
          </button>
        </div>
        {message && <span>{message}</span>}
        {error && <span>{error}</span>}
      </div>
    </form>
  );
}

export { MagicLink };
