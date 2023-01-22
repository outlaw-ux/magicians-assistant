// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.1";
import { corsHeaders } from "../_shared/cors.ts";
import type { Database } from "../_shared/database.types.ts";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

console.log(`Function "requested-friends" up and running!`);

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
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) throw new Error("cant find user");

    // And we can run queries in the context of our authenticated user
    const { data: requesterData, error: requesterError } = await supabaseClient
      .from("friends")
      .select("profile_two")
      .eq("profile_one", user.id);
    if (requesterError) throw requesterError;

    const { data: pendingFriendData, error: pendingFriendError } =
      await supabaseClient
        .from("friends")
        .select("profile_one")
        .eq("profile_two", user.id);
    if (pendingFriendError) throw pendingFriendError;

    const requestedFriends: Profile["id"][] = requesterData.map(
      ({ profile_two }) => profile_two
    );

    const pendingFriends: Profile["id"][] = pendingFriendData.map(
      ({ profile_one }) => profile_one
    );

    const mutualFriends: Profile["id"][] = [];
    requestedFriends.forEach((reqFriend) => {
      if (pendingFriends.includes(reqFriend)) {
        mutualFriends.push(reqFriend);
      }
    });
    const filteredPendingFriends = pendingFriends.filter(
      (f) => !mutualFriends.includes(f)
    );
    const filteredRequestedFriends = requestedFriends.filter(
      (f) => !mutualFriends.includes(f)
    );

    return new Response(
      JSON.stringify({
        mutualFriends,
        pendingFriends: filteredPendingFriends,
        requestedFriends: filteredRequestedFriends,
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
// curl --request POST 'https://npqxiigutfvuvenxjacw.functions.supabase.co/requested-friends' \
//   --header 'apiKey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcXhpaWd1dGZ2dXZlbnhqYWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxMzc4MDcsImV4cCI6MTk4ODcxMzgwN30.l3ZtumNpmC7VMxXzdUC_6dp9XBthO5KIc3AMiL90-Og' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjc0MzUwODExLCJzdWIiOiJlNWQ3OWI1NS0yZjc1LTQwNzEtYWQ5YS1mYjY2MWRkYzAxNGQiLCJlbWFpbCI6IiIsInBob25lIjoiMTMxNDc2NjQ0MzIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJwaG9uZSIsInByb3ZpZGVycyI6WyJwaG9uZSJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib3RwIiwidGltZXN0YW1wIjoxNjc0MzQ3MjExfV0sInNlc3Npb25faWQiOiI0YWQ0MGQ2My02Yzg2LTQ4NTYtOGYyZC1lMjEwOGU3M2FlMjYifQ.yNwyzAfl9UQuY1kNUZIULYlofSU-VkDDExiPOOMZU0I' \
//   --header 'Content-Type: application/json'
