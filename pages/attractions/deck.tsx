import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import shuffle from "../../utils/shuffle";
import { Attraction } from "../../utils/types";

export default function AttractionsDeck() {
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<Attraction[]>();
  const { supabase, user } = useSupabaseContext();

  useLayoutEffect(() => {
    if (!deck && supabase && user) {
      setLoading(true);
      supabase
        .from("decks")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data, error }) => {
          if (data) {
            setDeck(shuffle(data));
            setLoading(false);
          }
          if (error) throw new Error(error.message);
        });
    }
  }, [deck, supabase, user]);

  useEffect(() => {
    console.log("AttractionsDeck", deck?.length, loading);
  }, [deck, loading]);

  return (
    <div id="attractions-page">
      <Navigation />
      <h2>Attractions Deck</h2>
      <Link href="/attractions/customize">Customize Deck</Link>
      <p>Render Deck</p>

      <pre>
        {loading ? (
          "Loading..."
        ) : deck?.length ? (
          <p>Here is your deck</p>
        ) : (
          <p>Create a new deck first</p>
        )}
      </pre>
    </div>
  );
}
