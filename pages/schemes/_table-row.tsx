import { useCallback, useState } from "react";
import Card from "../../components/Card";
import type { SchemeCard } from "../../utils/types";

export default function SchemesCustomizeTableRow({
  card,
  selected = false,
  onChange,
}: {
  card: SchemeCard;
  selected?: boolean;
  onChange?: (data: { card: SchemeCard; selected: boolean }) => void;
}) {
  const [viewLargeCard, setViewLargeCard] = useState(false);

  const toggleImageDialog = useCallback(() => {
    setViewLargeCard((largeCard) => !largeCard);
  }, [setViewLargeCard]);

  const handleOnChange = () => {
    onChange?.({ selected: !selected, card });
  };

  const imagePath = card["image_uris/normal"];
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={card.id}
          checked={selected}
          onChange={handleOnChange}
        />
      </td>
      <td>
        {imagePath && (
          <>
            <Card
              src={imagePath}
              alt={`${card.name}`}
              width={30}
              height={43}
              onClick={toggleImageDialog}
            />
            <dialog open={viewLargeCard}>
              <Card
                src={imagePath}
                alt={`${card.name}`}
                onClick={toggleImageDialog}
              />
            </dialog>
          </>
        )}
      </td>
      <td>
        <p>{card.name}</p>
      </td>
      <td>
        <p style={{ whiteSpace: "pre-wrap" }}>{card.oracle_text}</p>
      </td>
    </tr>
  );
}
