import { useState } from "react";
import Card from "../../components/Card";
import { useSchemesContext } from "../../context";

export default function CurrentScheme() {
  const { currentScheme, setCurrentSchemeIndex, schemeCards } =
    useSchemesContext();
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  const handleNextSchemeClick = () => {
    setDisabledNextButton(true);
    setCurrentSchemeIndex((schemeIdx: number) => {
      const maxIdx = schemeCards.length - 1;
      const nextIdx = schemeIdx + 1;

      return nextIdx >= maxIdx ? schemeIdx : nextIdx;
    });
  };
  const imagePath = currentScheme?.image_uris?.normal;

  return (
    <>
      <h2>Current Scheme</h2>

      <p>
        <strong>{currentScheme?.name}</strong>
      </p>
      <p>
        {imagePath && (
          <Card
            src={imagePath}
            alt={`${currentScheme?.oracle_text}`}
            onLoad={() =>
              setTimeout(() => {
                setDisabledNextButton(false);
              }, 500)
            }
          />
        )}
      </p>

      <button onClick={handleNextSchemeClick} disabled={disabledNextButton}>
        Draw {currentScheme ? "Next" : "First"} Scheme
      </button>
    </>
  );
}
