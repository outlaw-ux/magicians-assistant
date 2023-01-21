// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.1";
import { corsHeaders } from "../_shared/cors.ts";
import { IFriendProfile } from "../_shared/types.ts";

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
      },
    );
    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    const requestedFriends: IFriendProfile[] = [];
    const pendingFriends: IFriendProfile[] = [];
    const mutualFriends: IFriendProfile[] = [];

    if (!user) throw new Error("cant find user");

    const getProfileUsername = (id: IFriendProfile["id"]) => {
      return supabaseClient
        .from("profiles")
        .select("username")
        .eq("id", id).then(({ data, error }) => {
          if (error) throw error;
          return data?.[0];
        });
    };

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

    // data = requests
    // foreach data to match request.id with user.id to find mutuals
    // if no match, keep in request array, if match, remove from requests array
    // find all places user.id is profile_two and not matching request.id

    requesterData.forEach(async (request) => {
      const { data: requestData, error: requestError } = await supabaseClient
        .from("friends")
        .select("*")
        .eq("profile_one", request.profile_two)
        .eq("profile_two", user.id);
      if (requestError) throw requestError;

      getProfileUsername(requestData.profile_one).then((username) => {
        mutualFriends.push({ id: requestData.profile_one, username });
      });
    });

    requesterData.forEach(async (request) => {
      const { username } = await getProfileUsername(request.profile_two);
      requestedFriends.push({ id: request.profile_two, username });
    });

    pendingFriendData.forEach(async (request) => {
      const { username } = await getProfileUsername(request.profile_one);
      pendingFriends.push({ id: request.profile_one, username });
    });

    return new Response(
      JSON.stringify({ mutualFriends, requestedFriends, pendingFriends }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/select-from-table-with-auth-rls' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"id":"e5d79b55-2f75-4071-ad9a-fb661ddc014d"}'
