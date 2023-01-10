import { useEffect } from "react";
import Auth from "../components/Auth";
import { useSupabaseContext } from "../context/Supabase";
import Game from "./Game";

const Home = () => {
  const user = useSupabaseContext();

  useEffect(() => {
    console.log("Home", user);
  }, [user]);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      !user ? <Auth /> : <Game />}
    </div>
  );
};

export default Home;
