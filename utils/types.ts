import { Database } from "../supabase/functions/_shared/database.types";

export type Attraction =
  Database["public"]["Tables"]["cards_attractions"]["Row"];
export type SchemeCard = Database["public"]["Tables"]["cards_schemes"]["Row"];
export type TokenCard = Database["public"]["Tables"]["cards_tokens"]["Row"];
export type StickerCard = Database["public"]["Tables"]["cards_stickers"]["Row"];
export type Deck = Database["public"]["Tables"]["decks"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Friend = Database["public"]["Tables"]["friends"]["Row"];
export type Game = Database["public"]["Tables"]["games"]["Row"];

export type DeckTypes = "attractions" | "schemes" | "tokens" | "stickers";

export interface IFriendProfile {
  id: Profile["id"];
  username: Profile["username"];
}

export interface IGameRequest {
  variant: Game["variant"];
  startingLife: Game["starting_life"];
  players: IFriendProfile["id"][];
}

export interface GameVariants {
  [key: string]: {
    minPlayers: number;
    title: string;
  };
}
