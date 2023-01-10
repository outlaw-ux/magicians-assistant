import React, { useEffect, useRef, useState } from "react";
import { useSupabaseContext } from "../context/Supabase";

const OtpSms = () => {
  const { supabase } = useSupabaseContext();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [errorMessage, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("Saving...");
    setLoading(true);

    let errorOutput;

    if (supabase) {
      if (sent && token) {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: `+1${phone}`,
          token,
          type: "sms",
        });
        errorOutput = error?.message;
        if (data) setMessage("Good Token");
      } else {
        const { data, error } = await supabase.auth.signInWithOtp({
          phone: `+1${phone}`,
        });
        errorOutput = error?.message;

        if (data) {
          tokenInputRef.current?.focus();
          setSent(true);
          setMessage("Check your phone for the magic token");
        }
      }
    }

    if (errorOutput) {
      setError(errorOutput);
      setMessage("");
      setSent(false);
      setToken("");
    } else {
      setError("");
    }
    setLoading(false);
  };

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <h3>SMS</h3>
      <div id="magic-wrapper">
        <div id="magic-form">
          <div id="magic-phone">
            <label>Phone (+1)</label>
            <input
              disabled={sent}
              type="tel"
              autoComplete="tel"
              placeholder="phone address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              ref={phoneInputRef}
            />
          </div>
          <div id="magic-token">
            <label>Magic Token</label>
            <input
              disabled={!sent}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              placeholder="phone address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToken(e.target.value)
              }
              ref={tokenInputRef}
            />
          </div>
          <button type="submit" disabled={loading}>
            Sign In
          </button>
        </div>
        {message && <span id="magic-response-message">{message}</span>}
        {errorMessage && <span id="magic-response-error">{errorMessage}</span>}
      </div>
    </form>
  );
};

export default OtpSms;
