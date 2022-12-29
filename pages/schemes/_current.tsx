import Card from "../../components/Card";
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
          <Card
            src={imagePath}
            alt={`${currentScheme?.oracle_text}`}
            onLoad={onLoad}
          />
        )}
      </p>
    </>
  );
}
