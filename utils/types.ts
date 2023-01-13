import { Database } from "./database.types";

export type Attraction =
  Database["public"]["Tables"]["cards_attractions"]["Row"];
export type Deck = Database["public"]["Tables"]["decks"]["Row"];

export type DeckTypes = "attractions" | "schemes" | "tokens";
