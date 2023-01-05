import React, { useLayoutEffect, useState } from "react";
import type { Card as CardType } from "scryfall-api";
import DOMPurify from "dompurify";
import { useDebounce } from "use-debounce";
import TokenListItem from "./_list-item";

export default function SelectToken() {
  const [searchValue, setSearchValue] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [tokenList, setTokenList] = useState<CardType[]>();
  const [debouncedValue] = useDebounce(searchValue, 500);

  const searchTokenList = async (val?: string) => {
    if (val) {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=t:token%20-is:dfc%20${DOMPurify.sanitize(
          val
        )}`
      );
      const filteredTokens = await res.json();
      setTokenList(filteredTokens.data);
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

  useLayoutEffect(() => {
    searchTokenList(debouncedValue);
  }, [debouncedValue]);

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
              <TokenListItem token={token} key={token.id} />
            ))
          ) : (
            <li>No Results, try searching a token name.</li>
          )}
        </ul>
      )}
    </>
  );
}
