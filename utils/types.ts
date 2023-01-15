import { Database } from "./database.types";

export type Attraction =
  Database["public"]["Tables"]["cards_attractions"]["Row"];
export type SchemeCard = Database["public"]["Tables"]["cards_schemes"]["Row"];
export type TokenCard = Database["public"]["Tables"]["cards_tokens"]["Row"];
export type StickerCard = Database["public"]["Tables"]["cards_stickers"]["Row"];
export type Deck = Database["public"]["Tables"]["decks"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Friend = Database["public"]["Tables"]["friends"]["Row"];

export type DeckTypes = "attractions" | "schemes" | "tokens";
export interface IFriendProfile {
  id: Profile["id"];
  username: Profile["username"];
  friend_id: Friend["id"];
}
