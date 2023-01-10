import React, { useEffect, useState } from "react";
import { useSupabaseContext } from "../context/Supabase";

const OtpEmail = () => {
  const { session } = useSupabaseContext();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("Saving...");
    setLoading(true);
    const { error } = await session.auth.signInWithOtp({
      email,
    });
    if (error) {
      setError(error.message);
      setMessage("");
    } else {
      setError("");
      setMessage("Check your email for the magic link");
    }
    setLoading(false);
  };

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <h3>Email</h3>
      <div id="magic-wrapper">
        <div id="magic-form">
          <div id="magic-email">
            <label>Magic Link Login</label>
            <input
              type="email"
              placeholder="email address"
              autoComplete="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <button type="submit" disabled={loading}>
            Sign In
          </button>
        </div>
        {message && <span id="magic-response-message">{message}</span>}
        {error && <span id="magic-response-error">{error}</span>}
      </div>
    </form>
  );
};

export default OtpEmail;
