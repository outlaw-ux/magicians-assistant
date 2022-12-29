import Image from "next/image";
import { useMemo } from "react";
import { useSchemesContext } from "../../context";

export default function CurrentScheme({ onLoad }: { onLoad: () => void }) {
  const { currentScheme } = useSchemesContext();
  const imagePath = currentScheme?.image_uris?.normal;

  return (
    <>
      <p>
        <strong>{currentScheme?.name}</strong>
      </p>
      <p>
        {imagePath && (
          <Image
            src={imagePath}
            width="300"
            height="428"
            alt={`${currentScheme?.oracle_text}`}
            onLoad={onLoad}
            placeholder="blur"
            blurDataURL="/assets/loading.jpg"
          />
        )}
      </p>
    </>
  );
}
