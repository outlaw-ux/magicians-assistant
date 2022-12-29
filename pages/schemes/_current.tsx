import Image from 'next/image';
import { useMemo } from 'react';
import type { Card } from 'scryfall-api';

export default function CurrentScheme({
  scheme,
  onLoad,
}: {
  scheme: Card;
  onLoad: () => void;
}) {
  const imagePath = useMemo(() => scheme.image_uris?.normal, [scheme]);

  return (
    <>
      <p>
        <strong>{scheme.name}</strong>
      </p>
      <p>
        <Image
          src={`${imagePath}`}
          width="300"
          height="428"
          alt={`${scheme.oracle_text}`}
          onLoadingComplete={onLoad}
        />
      </p>
    </>
  );
}
