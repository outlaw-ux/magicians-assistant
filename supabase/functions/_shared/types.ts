import { Database } from "./database.types.ts";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Friend = Database["public"]["Tables"]["friends"]["Row"];

export interface IFriendProfile {
  id: Profile["id"];
  username: Profile["username"];
}
