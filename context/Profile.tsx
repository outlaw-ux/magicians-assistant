import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { username } from "react-lorem-ipsum";
import NewProfile from "../components/EditProfile";
import { Profile } from "../utils/types";
import { useSupabaseContext } from "./Supabase";

interface IProfile {
  username: string;
  saveProfile: (profile: Partial<Profile>) => Promise<Profile | void>;
}

const defaultContext: IProfile = {
  username: username(),
  saveProfile: () => Promise.resolve(),
};

const ProfileContext = createContext(defaultContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");

  const [onboarded, setOnboarded] = useState(false);
  const [username, setUsername] = useState(defaultContext.username);

  const getProfile = useCallback(async () => {
    return supabase.from("profiles").select("username").eq("id", user.id);
  }, [supabase, user]);

  const saveProfile: IProfile["saveProfile"] = useCallback(
    async (profile) => {
      return supabase
        .from("profiles")
        .update({ ...profile, id: user.id })
        .eq("id", user.id)
        .select()
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          if (profile?.username && profile?.username !== username) {
            setUsername(profile.username);
          }
          if (!onboarded) {
            setOnboarded(true);
          }
          return data[0];
        });
    },
    [supabase, user]
  );

  useLayoutEffect(() => {
    if (!onboarded) {
      getProfile().then(({ data, error }) => {
        if (error) throw new Error(error.message);
        if (data?.[0]?.username) {
          setUsername(data[0].username);
          setOnboarded(true);
        }
      });
    }
  }, [onboarded, getProfile]);

  /*
    check if Profile has `screenname` defined, if not, require they create one
  */

  return (
    <ProfileContext.Provider value={{ username, saveProfile }}>
      {onboarded ? children : <NewProfile />}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
