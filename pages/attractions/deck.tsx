import Link from "next/link";
import { useCallback, useLayoutEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useSupabaseContext } from "../../context/Supabase";
import shuffle from "../../utils/shuffle";
import { Attraction } from "../../utils/types";
import { DECK_TYPE } from "./_constants";

export default function AttractionsDeck() {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<Attraction[]>([]);

  // const getCard = useCallback(
  //   async (id: string) => {
  //     return await supabase
  //       .from(DECK_TYPE)
  //       .select("*")
  //       .eq("id", id)
  //       .then(({ data, error }) => {
  //         if (data) {
  //           return data as Attraction[];
  //         }
  //         if (error) throw new Error(error.message);
  //       });
  //   },
  //   [supabase]
  // );

  useLayoutEffect(() => {
    if (!deck?.length && !loading) {
      setLoading(true);
      supabase
        .from("decks")
        .select("*")
        .eq("user_id", user.id)
        .eq("type", DECK_TYPE)
        .then(({ data, error }) => {
          if (data?.length) {
            setDeck(shuffle(data[0].cards));
            setLoading(false);
          }
          if (error) throw new Error(error.message);
        });
    }
  }, [deck, supabase, user, loading]);

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
          <>
            <p>Here is your deck</p>
            <pre>{JSON.stringify(deck, undefined, 2)}</pre>
          </>
        ) : (
          <p>
            Create a <Link href="/attractions/customize">new deck</Link> first
          </p>
        )}
      </pre>
    </div>
  );
}
