import { Database } from "./database.types";

export type Attraction =
  Database["public"]["Tables"]["cards_attractions"]["Row"];
export type SchemeCard = Database["public"]["Tables"]["cards_schemes"]["Row"];
export type TokenCard = Database["public"]["Tables"]["cards_tokens"]["Row"];
export type StickerCard = Database["public"]["Tables"]["cards_stickers"]["Row"];
export type Deck = Database["public"]["Tables"]["decks"]["Row"];

export type DeckTypes = "attractions" | "schemes" | "tokens";
