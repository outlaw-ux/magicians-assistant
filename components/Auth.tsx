import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseContext } from "../context";

const App = () => {
  const { supabase } = useSupabaseContext();
  if (!supabase) return null;

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["discord"]}
    />
  );
};
export default App;
