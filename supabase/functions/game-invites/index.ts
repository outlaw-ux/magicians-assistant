// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.1";
import { corsHeaders } from "../_shared/cors.ts";
import type { Database } from "../_shared/database.types.ts";

console.log(`Function "game-invites" up and running!`);

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    // Now we can get the session or user object
    const { friend_id: profile_id } = await req.json();

    if (!profile_id) throw new Error("cant find friend ID");

    // And we can run queries in the context of our authenticated user
    const { data, error } = await supabaseClient
      .from("game_invites")
      .select("*")
      .match({ profile_id });

    if (error) throw new Error(error.message);

    console.log("QUERY RES: ", data);

    // const { data: gameInvitesJoin, error: inviteErrorJoin } =
    //   await supabaseClient.from("game_invites").select(`
    //   game:game_id(id),
    //   player:profile_id(id)
    // `);
    // if (inviteErrorJoin) throw inviteErrorJoin;

    // const { data, error } = await supabase
    //   .from("cities")
    //   .select("name, countries(*)")
    //   .eq("countries.name", "Estonia");

    // SELECT games.id
    // FROM games
    // INNER JOIN game_invites
    // ON games.id = game_invites.game_id
    // AND active is true
    // AND game_invites.profile_id = user_id;

    return new Response(
      JSON.stringify({
        getGameInvites: data,
        // gameInvitesJoin,
        // players: ["1", "2", "3"],
        // id: "321",
        // startingLife: 40,
        // variant: null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl --request POST 'https://npqxiigutfvuvenxjacw.functions.supabase.co/game-invites' \
//   --header 'apiKey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcXhpaWd1dGZ2dXZlbnhqYWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxMzc4MDcsImV4cCI6MTk4ODcxMzgwN30.l3ZtumNpmC7VMxXzdUC_6dp9XBthO5KIc3AMiL90-Og' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjc1NTY1OTk3LCJzdWIiOiJlNWQ3OWI1NS0yZjc1LTQwNzEtYWQ5YS1mYjY2MWRkYzAxNGQiLCJlbWFpbCI6IiIsInBob25lIjoiMTMxNDc2NjQ0MzIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJwaG9uZSIsInByb3ZpZGVycyI6WyJwaG9uZSJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib3RwIiwidGltZXN0YW1wIjoxNjc0NzgyMTE0fV0sInNlc3Npb25faWQiOiIwMzc0NDk4NC01MzkwLTQzZDEtYWM2YS04MjE1NGQ4NjIwZmIifQ.VccPIW1dCQZ2rulmgsHNulAUcXsyYFBShOTOue8okKM' \
//   --header 'Content-Type: application/json'
