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
  username: Profile["username"];
  saveProfile: (profile: Partial<Profile>) => Promise<Profile | void>;
  getProfile: (id: Profile["id"]) => Promise<Profile | void>;
  profile: Profile | undefined;
}

const defaultContext: IProfile = {
  username: username(),
  saveProfile: () => Promise.resolve(),
  getProfile: () => Promise.resolve(),
  profile: undefined,
};

const ProfileContext = createContext(defaultContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { supabase, user } = useSupabaseContext();
  if (!supabase || !user) throw new Error("How did you even get here?");

  const [onboarded, setOnboarded] = useState(false);
  const [username, setUsername] = useState(defaultContext.username);
  const [profile, setProfile] = useState<Profile>();

  const getProfile = useCallback(
    async (id?: Profile["id"]) => {
      if (profile && !id) return Promise.resolve(profile);

      return supabase
        .from("profiles")
        .select("*")
        .eq("id", id || user.id)
        .then(({ error, data }) => {
          if (error) throw new Error(error.message);
          if (data?.[0]?.username) {
            setProfile(data[0]);
          }
          return data[0];
        });
    },
    [supabase, user, profile]
  );

  //todo: move this to Edge Function to better sanitize input data
  const saveProfile: IProfile["saveProfile"] = useCallback(
    async (profile) => {
      return supabase
        .from("profiles")
        .update({ ...profile })
        .eq("id", user.id)
        .select()
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          if (profile?.username && profile?.username !== username) {
            setUsername(profile.username);
          }
          setProfile(data[0]);
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
      getProfile().then((data: Profile) => {
        if (data?.username) {
          setUsername(data.username);
          setOnboarded(true);
        }
      });
    }
  }, [onboarded, getProfile]);

  return (
    <ProfileContext.Provider
      value={{ username, saveProfile, profile, getProfile }}>
      {onboarded ? children : <NewProfile />}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
