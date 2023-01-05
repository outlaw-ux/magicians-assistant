import React, { useLayoutEffect, useState } from "react";
import type { Card as CardType } from "scryfall-api";
import DOMPurify from "dompurify";
import { useDebounce } from "use-debounce";
import Card from "../../components/Card";

interface IImageDialogs {
  [key: CardType["id"]]: boolean;
}

export default function SelectToken() {
  const [searchValue, setSearchValue] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [tokenList, setTokenList] = useState<CardType[]>();
  const [debouncedValue] = useDebounce(searchValue, 500);
  const [viewLargeCard, setViewLargeCard] = useState<{
    [key: CardType["id"]]: boolean;
  }>();

  const searchTokenList = async (val?: string) => {
    if (val) {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=t:token%20-is:dfc%20${DOMPurify.sanitize(
          val
        )}`
      );
      const filteredTokens = await res.json();
      const newTokenList = filteredTokens.data as CardType[];
      const defaultImageDialogs: IImageDialogs = {};
      newTokenList?.forEach((token) => {
        defaultImageDialogs[token.id] = false;
      });
      setViewLargeCard(defaultImageDialogs);
      setTokenList(newTokenList);
    } else {
      setTokenList(undefined);
    }

    setLoading(false);
  };

  const debounceSearchToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLoading(true);
    setSearchValue(value);
  };

  const toggleImageDialog = (tokenId: CardType["id"]) => {
    setViewLargeCard((largeCard) => ({
      ...largeCard,
      [tokenId]: !largeCard?.[tokenId],
    }));
  };

  useLayoutEffect(() => {
    searchTokenList(debouncedValue);
  }, [debouncedValue]);
  useLayoutEffect(() => {
    console.log(tokenList);
  }, [tokenList]);

  return (
    <>
      Search: <input type="text" onChange={debounceSearchToken} />
      <p>
        <small>
          <em>
            Filtered out all double sided tokens, ping me @mtgomglol on Twitter
            if you need one added back in.
          </em>
        </small>
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tokenList?.length ? (
            tokenList.map((token) => (
              <li key={token.id}>
                <p>
                  <strong>{token.name}</strong>
                </p>
                {token.image_uris?.normal && (
                  <>
                    <Card
                      src={token.image_uris.normal}
                      width={30}
                      height={43}
                      alt={token.name}
                      onClick={() => toggleImageDialog(token.id)}
                    />

                    <dialog open={viewLargeCard?.[token.id]}>
                      <Card
                        src={token.image_uris.normal}
                        alt={token.name}
                        onClick={() => toggleImageDialog(token.id)}
                      />
                    </dialog>
                  </>
                )}

                <ul>
                  <li>{token.type_line}</li>
                  {token.oracle_text && <li>{token.oracle_text}</li>}
                  <li>
                    {token.power}/{token.toughness}
                  </li>
                </ul>
              </li>
            ))
          ) : (
            <li>No Results, try searching a token name.</li>
          )}
        </ul>
      )}
    </>
  );
}
