export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards_attractions: {
        Row: {
          "all_parts/0/component": string | null
          "all_parts/0/id": string | null
          "all_parts/0/name": string | null
          "all_parts/0/object": string | null
          "all_parts/0/type_line": string | null
          "all_parts/0/uri": string | null
          "all_parts/1/component": string | null
          "all_parts/1/id": string | null
          "all_parts/1/name": string | null
          "all_parts/1/object": string | null
          "all_parts/1/type_line": string | null
          "all_parts/1/uri": string | null
          "all_parts/2/component": string | null
          "all_parts/2/id": string | null
          "all_parts/2/name": string | null
          "all_parts/2/object": string | null
          "all_parts/2/type_line": string | null
          "all_parts/2/uri": string | null
          "all_parts/3/component": string | null
          "all_parts/3/id": string | null
          "all_parts/3/name": string | null
          "all_parts/3/object": string | null
          "all_parts/3/type_line": string | null
          "all_parts/3/uri": string | null
          "all_parts/4/component": string | null
          "all_parts/4/id": string | null
          "all_parts/4/name": string | null
          "all_parts/4/object": string | null
          "all_parts/4/type_line": string | null
          "all_parts/4/uri": string | null
          "all_parts/5/component": string | null
          "all_parts/5/id": string | null
          "all_parts/5/name": string | null
          "all_parts/5/object": string | null
          "all_parts/5/type_line": string | null
          "all_parts/5/uri": string | null
          "all_parts/6/component": string | null
          "all_parts/6/id": string | null
          "all_parts/6/name": string | null
          "all_parts/6/object": string | null
          "all_parts/6/type_line": string | null
          "all_parts/6/uri": string | null
          artist: string | null
          "artist_ids/0": string | null
          "attraction_lights/0": number | null
          "attraction_lights/1": number | null
          "attraction_lights/2": string | null
          "attraction_lights/3": string | null
          booster: boolean | null
          border_color: string | null
          card_back_id: string | null
          cardmarket_id: string | null
          cmc: string | null
          collector_number: string | null
          digital: boolean | null
          edhrec_rank: number | null
          "finishes/0": string | null
          "finishes/1": string | null
          flavor_text: string | null
          foil: boolean | null
          frame: number | null
          full_art: boolean | null
          "games/0": string | null
          highres_image: boolean | null
          id: string
          illustration_id: string | null
          image_status: string | null
          "image_uris/art_crop": string | null
          "image_uris/border_crop": string | null
          "image_uris/large": string | null
          "image_uris/normal": string | null
          "image_uris/png": string | null
          "image_uris/small": string | null
          "keywords/0": string | null
          "keywords/1": string | null
          lang: string | null
          layout: string | null
          "legalities/alchemy": string | null
          "legalities/brawl": string | null
          "legalities/commander": string | null
          "legalities/duel": string | null
          "legalities/explorer": string | null
          "legalities/future": string | null
          "legalities/gladiator": string | null
          "legalities/historic": string | null
          "legalities/historicbrawl": string | null
          "legalities/legacy": string | null
          "legalities/modern": string | null
          "legalities/oldschool": string | null
          "legalities/pauper": string | null
          "legalities/paupercommander": string | null
          "legalities/penny": string | null
          "legalities/pioneer": string | null
          "legalities/premodern": string | null
          "legalities/standard": string | null
          "legalities/vintage": string | null
          mana_cost: string | null
          "multiverse_ids/0": number | null
          name: string | null
          nonfoil: boolean | null
          object: string | null
          oracle_id: string | null
          oracle_text: string | null
          oversized: boolean | null
          "preview/previewed_at": string | null
          "preview/source": string | null
          "preview/source_uri": string | null
          "prices/eur": string | null
          "prices/eur_foil": string | null
          "prices/tix": string | null
          "prices/usd": number | null
          "prices/usd_etched": string | null
          "prices/usd_foil": number | null
          prints_search_uri: string | null
          promo: boolean | null
          "purchase_uris/cardhoarder": string | null
          "purchase_uris/cardmarket": string | null
          "purchase_uris/tcgplayer": string | null
          rarity: string | null
          "related_uris/edhrec": string | null
          "related_uris/gatherer": string | null
          "related_uris/tcgplayer_infinite_articles": string | null
          "related_uris/tcgplayer_infinite_decks": string | null
          released_at: string | null
          reprint: boolean | null
          reserved: boolean | null
          rulings_uri: string | null
          scryfall_set_uri: string | null
          scryfall_uri: string | null
          security_stamp: string | null
          set: string | null
          set_id: string | null
          set_name: string | null
          set_search_uri: string | null
          set_type: string | null
          set_uri: string | null
          story_spotlight: boolean | null
          tcgplayer_id: number | null
          textless: boolean | null
          type_line: string | null
          uri: string | null
          variation: boolean | null
        }
        Insert: {
          "all_parts/0/component"?: string | null
          "all_parts/0/id"?: string | null
          "all_parts/0/name"?: string | null
          "all_parts/0/object"?: string | null
          "all_parts/0/type_line"?: string | null
          "all_parts/0/uri"?: string | null
          "all_parts/1/component"?: string | null
          "all_parts/1/id"?: string | null
          "all_parts/1/name"?: string | null
          "all_parts/1/object"?: string | null
          "all_parts/1/type_line"?: string | null
          "all_parts/1/uri"?: string | null
          "all_parts/2/component"?: string | null
          "all_parts/2/id"?: string | null
          "all_parts/2/name"?: string | null
          "all_parts/2/object"?: string | null
          "all_parts/2/type_line"?: string | null
          "all_parts/2/uri"?: string | null
          "all_parts/3/component"?: string | null
          "all_parts/3/id"?: string | null
          "all_parts/3/name"?: string | null
          "all_parts/3/object"?: string | null
          "all_parts/3/type_line"?: string | null
          "all_parts/3/uri"?: string | null
          "all_parts/4/component"?: string | null
          "all_parts/4/id"?: string | null
          "all_parts/4/name"?: string | null
          "all_parts/4/object"?: string | null
          "all_parts/4/type_line"?: string | null
          "all_parts/4/uri"?: string | null
          "all_parts/5/component"?: string | null
          "all_parts/5/id"?: string | null
          "all_parts/5/name"?: string | null
          "all_parts/5/object"?: string | null
          "all_parts/5/type_line"?: string | null
          "all_parts/5/uri"?: string | null
          "all_parts/6/component"?: string | null
          "all_parts/6/id"?: string | null
          "all_parts/6/name"?: string | null
          "all_parts/6/object"?: string | null
          "all_parts/6/type_line"?: string | null
          "all_parts/6/uri"?: string | null
          artist?: string | null
          "artist_ids/0"?: string | null
          "attraction_lights/0"?: number | null
          "attraction_lights/1"?: number | null
          "attraction_lights/2"?: string | null
          "attraction_lights/3"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: string | null
          cmc?: string | null
          collector_number?: string | null
          digital?: boolean | null
          edhrec_rank?: number | null
          "finishes/0"?: string | null
          "finishes/1"?: string | null
          flavor_text?: string | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          "keywords/0"?: string | null
          "keywords/1"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          "multiverse_ids/0"?: number | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          "preview/previewed_at"?: string | null
          "preview/source"?: string | null
          "preview/source_uri"?: string | null
          "prices/eur"?: string | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: number | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: number | null
          prints_search_uri?: string | null
          promo?: boolean | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/gatherer"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          security_stamp?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: number | null
          textless?: boolean | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
        Update: {
          "all_parts/0/component"?: string | null
          "all_parts/0/id"?: string | null
          "all_parts/0/name"?: string | null
          "all_parts/0/object"?: string | null
          "all_parts/0/type_line"?: string | null
          "all_parts/0/uri"?: string | null
          "all_parts/1/component"?: string | null
          "all_parts/1/id"?: string | null
          "all_parts/1/name"?: string | null
          "all_parts/1/object"?: string | null
          "all_parts/1/type_line"?: string | null
          "all_parts/1/uri"?: string | null
          "all_parts/2/component"?: string | null
          "all_parts/2/id"?: string | null
          "all_parts/2/name"?: string | null
          "all_parts/2/object"?: string | null
          "all_parts/2/type_line"?: string | null
          "all_parts/2/uri"?: string | null
          "all_parts/3/component"?: string | null
          "all_parts/3/id"?: string | null
          "all_parts/3/name"?: string | null
          "all_parts/3/object"?: string | null
          "all_parts/3/type_line"?: string | null
          "all_parts/3/uri"?: string | null
          "all_parts/4/component"?: string | null
          "all_parts/4/id"?: string | null
          "all_parts/4/name"?: string | null
          "all_parts/4/object"?: string | null
          "all_parts/4/type_line"?: string | null
          "all_parts/4/uri"?: string | null
          "all_parts/5/component"?: string | null
          "all_parts/5/id"?: string | null
          "all_parts/5/name"?: string | null
          "all_parts/5/object"?: string | null
          "all_parts/5/type_line"?: string | null
          "all_parts/5/uri"?: string | null
          "all_parts/6/component"?: string | null
          "all_parts/6/id"?: string | null
          "all_parts/6/name"?: string | null
          "all_parts/6/object"?: string | null
          "all_parts/6/type_line"?: string | null
          "all_parts/6/uri"?: string | null
          artist?: string | null
          "artist_ids/0"?: string | null
          "attraction_lights/0"?: number | null
          "attraction_lights/1"?: number | null
          "attraction_lights/2"?: string | null
          "attraction_lights/3"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: string | null
          cmc?: string | null
          collector_number?: string | null
          digital?: boolean | null
          edhrec_rank?: number | null
          "finishes/0"?: string | null
          "finishes/1"?: string | null
          flavor_text?: string | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id?: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          "keywords/0"?: string | null
          "keywords/1"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          "multiverse_ids/0"?: number | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          "preview/previewed_at"?: string | null
          "preview/source"?: string | null
          "preview/source_uri"?: string | null
          "prices/eur"?: string | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: number | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: number | null
          prints_search_uri?: string | null
          promo?: boolean | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/gatherer"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          security_stamp?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: number | null
          textless?: boolean | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
      }
      cards_schemes: {
        Row: {
          "all_parts/0/component": string | null
          "all_parts/0/id": string | null
          "all_parts/0/name": string | null
          "all_parts/0/object": string | null
          "all_parts/0/type_line": string | null
          "all_parts/0/uri": string | null
          "all_parts/1/component": string | null
          "all_parts/1/id": string | null
          "all_parts/1/name": string | null
          "all_parts/1/object": string | null
          "all_parts/1/type_line": string | null
          "all_parts/1/uri": string | null
          artist: string | null
          "artist_ids/0": string | null
          booster: boolean | null
          border_color: string | null
          card_back_id: string | null
          cardmarket_id: number | null
          cmc: string | null
          collector_number: string | null
          "color_identity/0": string | null
          "color_identity/1": string | null
          "color_identity/2": string | null
          digital: boolean | null
          "finishes/0": string | null
          flavor_text: Json | null
          foil: boolean | null
          frame: number | null
          full_art: boolean | null
          "games/0": string | null
          highres_image: boolean | null
          id: string
          illustration_id: string | null
          image_status: string | null
          "image_uris/art_crop": string | null
          "image_uris/border_crop": string | null
          "image_uris/large": string | null
          "image_uris/normal": string | null
          "image_uris/png": string | null
          "image_uris/small": string | null
          lang: string | null
          layout: string | null
          "legalities/alchemy": string | null
          "legalities/brawl": string | null
          "legalities/commander": string | null
          "legalities/duel": string | null
          "legalities/explorer": string | null
          "legalities/future": string | null
          "legalities/gladiator": string | null
          "legalities/historic": string | null
          "legalities/historicbrawl": string | null
          "legalities/legacy": string | null
          "legalities/modern": string | null
          "legalities/oldschool": string | null
          "legalities/pauper": string | null
          "legalities/paupercommander": string | null
          "legalities/penny": string | null
          "legalities/pioneer": string | null
          "legalities/premodern": string | null
          "legalities/standard": string | null
          "legalities/vintage": string | null
          mana_cost: string | null
          "multiverse_ids/0": number | null
          name: string | null
          nonfoil: boolean | null
          object: string | null
          oracle_id: string | null
          oracle_text: string | null
          oversized: boolean | null
          "prices/eur": number | null
          "prices/eur_foil": string | null
          "prices/tix": string | null
          "prices/usd": number | null
          "prices/usd_etched": string | null
          "prices/usd_foil": string | null
          prints_search_uri: string | null
          "produced_mana/0": string | null
          "produced_mana/1": string | null
          "produced_mana/2": string | null
          "produced_mana/3": string | null
          "produced_mana/4": string | null
          promo: boolean | null
          "promo_types/0": string | null
          "purchase_uris/cardhoarder": string | null
          "purchase_uris/cardmarket": string | null
          "purchase_uris/tcgplayer": string | null
          rarity: string | null
          "related_uris/edhrec": string | null
          "related_uris/gatherer": string | null
          "related_uris/tcgplayer_infinite_articles": string | null
          "related_uris/tcgplayer_infinite_decks": string | null
          released_at: string | null
          reprint: boolean | null
          reserved: boolean | null
          rulings_uri: string | null
          scryfall_set_uri: string | null
          scryfall_uri: string | null
          set: string | null
          set_id: string | null
          set_name: string | null
          set_search_uri: string | null
          set_type: string | null
          set_uri: string | null
          story_spotlight: boolean | null
          tcgplayer_id: number | null
          textless: boolean | null
          type_line: string | null
          uri: string | null
          variation: boolean | null
        }
        Insert: {
          "all_parts/0/component"?: string | null
          "all_parts/0/id"?: string | null
          "all_parts/0/name"?: string | null
          "all_parts/0/object"?: string | null
          "all_parts/0/type_line"?: string | null
          "all_parts/0/uri"?: string | null
          "all_parts/1/component"?: string | null
          "all_parts/1/id"?: string | null
          "all_parts/1/name"?: string | null
          "all_parts/1/object"?: string | null
          "all_parts/1/type_line"?: string | null
          "all_parts/1/uri"?: string | null
          artist?: string | null
          "artist_ids/0"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: number | null
          cmc?: string | null
          collector_number?: string | null
          "color_identity/0"?: string | null
          "color_identity/1"?: string | null
          "color_identity/2"?: string | null
          digital?: boolean | null
          "finishes/0"?: string | null
          flavor_text?: Json | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          "multiverse_ids/0"?: number | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          "prices/eur"?: number | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: number | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: string | null
          prints_search_uri?: string | null
          "produced_mana/0"?: string | null
          "produced_mana/1"?: string | null
          "produced_mana/2"?: string | null
          "produced_mana/3"?: string | null
          "produced_mana/4"?: string | null
          promo?: boolean | null
          "promo_types/0"?: string | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/gatherer"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: number | null
          textless?: boolean | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
        Update: {
          "all_parts/0/component"?: string | null
          "all_parts/0/id"?: string | null
          "all_parts/0/name"?: string | null
          "all_parts/0/object"?: string | null
          "all_parts/0/type_line"?: string | null
          "all_parts/0/uri"?: string | null
          "all_parts/1/component"?: string | null
          "all_parts/1/id"?: string | null
          "all_parts/1/name"?: string | null
          "all_parts/1/object"?: string | null
          "all_parts/1/type_line"?: string | null
          "all_parts/1/uri"?: string | null
          artist?: string | null
          "artist_ids/0"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: number | null
          cmc?: string | null
          collector_number?: string | null
          "color_identity/0"?: string | null
          "color_identity/1"?: string | null
          "color_identity/2"?: string | null
          digital?: boolean | null
          "finishes/0"?: string | null
          flavor_text?: Json | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id?: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          "multiverse_ids/0"?: number | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          "prices/eur"?: number | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: number | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: string | null
          prints_search_uri?: string | null
          "produced_mana/0"?: string | null
          "produced_mana/1"?: string | null
          "produced_mana/2"?: string | null
          "produced_mana/3"?: string | null
          "produced_mana/4"?: string | null
          promo?: boolean | null
          "promo_types/0"?: string | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/gatherer"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: number | null
          textless?: boolean | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
      }
      cards_stickers: {
        Row: {
          artist: string | null
          "artist_ids/0": string | null
          "artist_ids/1": string | null
          booster: boolean | null
          border_color: string | null
          card_back_id: string | null
          cardmarket_id: number | null
          cmc: string | null
          collector_number: number | null
          digital: boolean | null
          "finishes/0": string | null
          "finishes/1": string | null
          foil: boolean | null
          frame: number | null
          full_art: boolean | null
          "games/0": string | null
          highres_image: boolean | null
          id: string
          illustration_id: string | null
          image_status: string | null
          "image_uris/art_crop": string | null
          "image_uris/border_crop": string | null
          "image_uris/large": string | null
          "image_uris/normal": string | null
          "image_uris/png": string | null
          "image_uris/small": string | null
          "keywords/0": string | null
          lang: string | null
          layout: string | null
          "legalities/alchemy": string | null
          "legalities/brawl": string | null
          "legalities/commander": string | null
          "legalities/duel": string | null
          "legalities/explorer": string | null
          "legalities/future": string | null
          "legalities/gladiator": string | null
          "legalities/historic": string | null
          "legalities/historicbrawl": string | null
          "legalities/legacy": string | null
          "legalities/modern": string | null
          "legalities/oldschool": string | null
          "legalities/pauper": string | null
          "legalities/paupercommander": string | null
          "legalities/penny": string | null
          "legalities/pioneer": string | null
          "legalities/premodern": string | null
          "legalities/standard": string | null
          "legalities/vintage": string | null
          mana_cost: string | null
          "multiverse_ids/0": number | null
          name: string | null
          nonfoil: boolean | null
          object: string | null
          oracle_id: string | null
          oracle_text: string | null
          oversized: boolean | null
          "prices/eur": number | null
          "prices/eur_foil": string | null
          "prices/tix": string | null
          "prices/usd": number | null
          "prices/usd_etched": string | null
          "prices/usd_foil": string | null
          prints_search_uri: string | null
          "produced_mana/0": string | null
          "produced_mana/1": string | null
          "produced_mana/2": string | null
          "produced_mana/3": string | null
          "produced_mana/4": string | null
          promo: boolean | null
          "purchase_uris/cardhoarder": string | null
          "purchase_uris/cardmarket": string | null
          "purchase_uris/tcgplayer": string | null
          rarity: string | null
          "related_uris/edhrec": string | null
          "related_uris/gatherer": string | null
          "related_uris/tcgplayer_infinite_articles": string | null
          "related_uris/tcgplayer_infinite_decks": string | null
          released_at: string | null
          reprint: boolean | null
          reserved: boolean | null
          rulings_uri: string | null
          scryfall_set_uri: string | null
          scryfall_uri: string | null
          set: string | null
          set_id: string | null
          set_name: string | null
          set_search_uri: string | null
          set_type: string | null
          set_uri: string | null
          story_spotlight: boolean | null
          tcgplayer_id: number | null
          textless: boolean | null
          type_line: string | null
          uri: string | null
          variation: boolean | null
        }
        Insert: {
          artist?: string | null
          "artist_ids/0"?: string | null
          "artist_ids/1"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: number | null
          cmc?: string | null
          collector_number?: number | null
          digital?: boolean | null
          "finishes/0"?: string | null
          "finishes/1"?: string | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          "keywords/0"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          "multiverse_ids/0"?: number | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          "prices/eur"?: number | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: number | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: string | null
          prints_search_uri?: string | null
          "produced_mana/0"?: string | null
          "produced_mana/1"?: string | null
          "produced_mana/2"?: string | null
          "produced_mana/3"?: string | null
          "produced_mana/4"?: string | null
          promo?: boolean | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/gatherer"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: number | null
          textless?: boolean | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
        Update: {
          artist?: string | null
          "artist_ids/0"?: string | null
          "artist_ids/1"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: number | null
          cmc?: string | null
          collector_number?: number | null
          digital?: boolean | null
          "finishes/0"?: string | null
          "finishes/1"?: string | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id?: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          "keywords/0"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          "multiverse_ids/0"?: number | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          "prices/eur"?: number | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: number | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: string | null
          prints_search_uri?: string | null
          "produced_mana/0"?: string | null
          "produced_mana/1"?: string | null
          "produced_mana/2"?: string | null
          "produced_mana/3"?: string | null
          "produced_mana/4"?: string | null
          promo?: boolean | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/gatherer"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: number | null
          textless?: boolean | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
      }
      cards_tokens: {
        Row: {
          "all_parts/0/component": string | null
          "all_parts/0/id": string | null
          "all_parts/0/name": string | null
          "all_parts/0/object": string | null
          "all_parts/0/type_line": string | null
          "all_parts/0/uri": string | null
          "all_parts/1/component": string | null
          "all_parts/1/id": string | null
          "all_parts/1/name": string | null
          "all_parts/1/object": string | null
          "all_parts/1/type_line": string | null
          "all_parts/1/uri": string | null
          arena_id: string | null
          artist: string | null
          "artist_ids/0": string | null
          booster: boolean | null
          border_color: string | null
          card_back_id: string | null
          cardmarket_id: string | null
          cmc: string | null
          collector_number: string | null
          "color_identity/0": string | null
          "colors/0": string | null
          digital: boolean | null
          "finishes/0": string | null
          foil: boolean | null
          frame: number | null
          full_art: boolean | null
          "games/0": string | null
          highres_image: boolean | null
          id: string
          illustration_id: string | null
          image_status: string | null
          "image_uris/art_crop": string | null
          "image_uris/border_crop": string | null
          "image_uris/large": string | null
          "image_uris/normal": string | null
          "image_uris/png": string | null
          "image_uris/small": string | null
          "keywords/0": string | null
          lang: string | null
          layout: string | null
          "legalities/alchemy": string | null
          "legalities/brawl": string | null
          "legalities/commander": string | null
          "legalities/duel": string | null
          "legalities/explorer": string | null
          "legalities/future": string | null
          "legalities/gladiator": string | null
          "legalities/historic": string | null
          "legalities/historicbrawl": string | null
          "legalities/legacy": string | null
          "legalities/modern": string | null
          "legalities/oldschool": string | null
          "legalities/pauper": string | null
          "legalities/paupercommander": string | null
          "legalities/penny": string | null
          "legalities/pioneer": string | null
          "legalities/premodern": string | null
          "legalities/standard": string | null
          "legalities/vintage": string | null
          mana_cost: string | null
          name: string | null
          nonfoil: boolean | null
          object: string | null
          oracle_id: string | null
          oracle_text: string | null
          oversized: boolean | null
          power: string | null
          "prices/eur": string | null
          "prices/eur_foil": string | null
          "prices/tix": string | null
          "prices/usd": string | null
          "prices/usd_etched": string | null
          "prices/usd_foil": string | null
          prints_search_uri: string | null
          promo: boolean | null
          "promo_types/0": string | null
          "purchase_uris/cardhoarder": string | null
          "purchase_uris/cardmarket": string | null
          "purchase_uris/tcgplayer": string | null
          rarity: string | null
          "related_uris/edhrec": string | null
          "related_uris/tcgplayer_infinite_articles": string | null
          "related_uris/tcgplayer_infinite_decks": string | null
          released_at: string | null
          reprint: boolean | null
          reserved: boolean | null
          rulings_uri: string | null
          scryfall_set_uri: string | null
          scryfall_uri: string | null
          set: string | null
          set_id: string | null
          set_name: string | null
          set_search_uri: string | null
          set_type: string | null
          set_uri: string | null
          story_spotlight: boolean | null
          tcgplayer_id: string | null
          textless: boolean | null
          toughness: string | null
          type_line: string | null
          uri: string | null
          variation: boolean | null
        }
        Insert: {
          "all_parts/0/component"?: string | null
          "all_parts/0/id"?: string | null
          "all_parts/0/name"?: string | null
          "all_parts/0/object"?: string | null
          "all_parts/0/type_line"?: string | null
          "all_parts/0/uri"?: string | null
          "all_parts/1/component"?: string | null
          "all_parts/1/id"?: string | null
          "all_parts/1/name"?: string | null
          "all_parts/1/object"?: string | null
          "all_parts/1/type_line"?: string | null
          "all_parts/1/uri"?: string | null
          arena_id?: string | null
          artist?: string | null
          "artist_ids/0"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: string | null
          cmc?: string | null
          collector_number?: string | null
          "color_identity/0"?: string | null
          "colors/0"?: string | null
          digital?: boolean | null
          "finishes/0"?: string | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          "keywords/0"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          power?: string | null
          "prices/eur"?: string | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: string | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: string | null
          prints_search_uri?: string | null
          promo?: boolean | null
          "promo_types/0"?: string | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: string | null
          textless?: boolean | null
          toughness?: string | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
        Update: {
          "all_parts/0/component"?: string | null
          "all_parts/0/id"?: string | null
          "all_parts/0/name"?: string | null
          "all_parts/0/object"?: string | null
          "all_parts/0/type_line"?: string | null
          "all_parts/0/uri"?: string | null
          "all_parts/1/component"?: string | null
          "all_parts/1/id"?: string | null
          "all_parts/1/name"?: string | null
          "all_parts/1/object"?: string | null
          "all_parts/1/type_line"?: string | null
          "all_parts/1/uri"?: string | null
          arena_id?: string | null
          artist?: string | null
          "artist_ids/0"?: string | null
          booster?: boolean | null
          border_color?: string | null
          card_back_id?: string | null
          cardmarket_id?: string | null
          cmc?: string | null
          collector_number?: string | null
          "color_identity/0"?: string | null
          "colors/0"?: string | null
          digital?: boolean | null
          "finishes/0"?: string | null
          foil?: boolean | null
          frame?: number | null
          full_art?: boolean | null
          "games/0"?: string | null
          highres_image?: boolean | null
          id?: string
          illustration_id?: string | null
          image_status?: string | null
          "image_uris/art_crop"?: string | null
          "image_uris/border_crop"?: string | null
          "image_uris/large"?: string | null
          "image_uris/normal"?: string | null
          "image_uris/png"?: string | null
          "image_uris/small"?: string | null
          "keywords/0"?: string | null
          lang?: string | null
          layout?: string | null
          "legalities/alchemy"?: string | null
          "legalities/brawl"?: string | null
          "legalities/commander"?: string | null
          "legalities/duel"?: string | null
          "legalities/explorer"?: string | null
          "legalities/future"?: string | null
          "legalities/gladiator"?: string | null
          "legalities/historic"?: string | null
          "legalities/historicbrawl"?: string | null
          "legalities/legacy"?: string | null
          "legalities/modern"?: string | null
          "legalities/oldschool"?: string | null
          "legalities/pauper"?: string | null
          "legalities/paupercommander"?: string | null
          "legalities/penny"?: string | null
          "legalities/pioneer"?: string | null
          "legalities/premodern"?: string | null
          "legalities/standard"?: string | null
          "legalities/vintage"?: string | null
          mana_cost?: string | null
          name?: string | null
          nonfoil?: boolean | null
          object?: string | null
          oracle_id?: string | null
          oracle_text?: string | null
          oversized?: boolean | null
          power?: string | null
          "prices/eur"?: string | null
          "prices/eur_foil"?: string | null
          "prices/tix"?: string | null
          "prices/usd"?: string | null
          "prices/usd_etched"?: string | null
          "prices/usd_foil"?: string | null
          prints_search_uri?: string | null
          promo?: boolean | null
          "promo_types/0"?: string | null
          "purchase_uris/cardhoarder"?: string | null
          "purchase_uris/cardmarket"?: string | null
          "purchase_uris/tcgplayer"?: string | null
          rarity?: string | null
          "related_uris/edhrec"?: string | null
          "related_uris/tcgplayer_infinite_articles"?: string | null
          "related_uris/tcgplayer_infinite_decks"?: string | null
          released_at?: string | null
          reprint?: boolean | null
          reserved?: boolean | null
          rulings_uri?: string | null
          scryfall_set_uri?: string | null
          scryfall_uri?: string | null
          set?: string | null
          set_id?: string | null
          set_name?: string | null
          set_search_uri?: string | null
          set_type?: string | null
          set_uri?: string | null
          story_spotlight?: boolean | null
          tcgplayer_id?: string | null
          textless?: boolean | null
          toughness?: string | null
          type_line?: string | null
          uri?: string | null
          variation?: boolean | null
        }
      }
      cards_treachery: {
        Row: {
          artist: string | null
          id: string
          name: string | null
          rarity: string | null
          rulings: string[] | null
          text: string | null
          type: string | null
          "types/subtype": string | null
          "types/supertype": string | null
          uri: string | null
        }
        Insert: {
          artist?: string | null
          id?: string
          name?: string | null
          rarity?: string | null
          rulings?: string[] | null
          text?: string | null
          type?: string | null
          "types/subtype"?: string | null
          "types/supertype"?: string | null
          uri?: string | null
        }
        Update: {
          artist?: string | null
          id?: string
          name?: string | null
          rarity?: string | null
          rulings?: string[] | null
          text?: string | null
          type?: string | null
          "types/subtype"?: string | null
          "types/supertype"?: string | null
          uri?: string | null
        }
      }
      decks: {
        Row: {
          cards: string | null
          created_at: string | null
          id: string
          name: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          cards?: string | null
          created_at?: string | null
          id?: string
          name?: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          cards?: string | null
          created_at?: string | null
          id?: string
          name?: string
          type?: string | null
          user_id?: string | null
        }
      }
      friends: {
        Row: {
          created_at: string | null
          id: string
          profile_one: string
          profile_two: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_one: string
          profile_two: string
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_one?: string
          profile_two?: string
        }
      }
      game_invites: {
        Row: {
          created_at: string | null
          creator_id: string | null
          game_id: string
          id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          game_id: string
          id?: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          game_id?: string
          id?: string
          profile_id?: string
        }
      }
      game_players: {
        Row: {
          game_id: string
          profile_id: string
        }
        Insert: {
          game_id: string
          profile_id: string
        }
        Update: {
          game_id?: string
          profile_id?: string
        }
      }
      games: {
        Row: {
          created_at: string | null
          creator: string
          decks: string[] | null
          game_type: string | null
          id: string
          is_active: boolean
          starting_life: number | null
          teams: string | null
          variant: string | null
        }
        Insert: {
          created_at?: string | null
          creator: string
          decks?: string[] | null
          game_type?: string | null
          id?: string
          is_active?: boolean
          starting_life?: number | null
          teams?: string | null
          variant?: string | null
        }
        Update: {
          created_at?: string | null
          creator?: string
          decks?: string[] | null
          game_type?: string | null
          id?: string
          is_active?: boolean
          starting_life?: number | null
          teams?: string | null
          variant?: string | null
        }
      }
      profiles: {
        Row: {
          current_game: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          current_game?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          current_game?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
