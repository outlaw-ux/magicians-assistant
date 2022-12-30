import { useState } from "react";
import Card from "../../components/Card";
import { useAttractionsContext } from "../../context";

export default function CurrentAttraction() {
  const { currentAttraction, drawNextCard } = useAttractionsContext();
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  const handleNextAttractionClick = () => {
    console.log("handleNextAttractionClick");
    setDisabledNextButton(true);
    drawNextCard();
  };
  const imagePath = currentAttraction?.image_uris?.normal;

  console.log({ currentAttraction });

  return (
    <>
      <h2>Current Attraction</h2>

      <p>
        <strong>{currentAttraction?.name}</strong>
      </p>
      <p>
        {imagePath && (
          <Card
            src={imagePath}
            alt={`${currentAttraction?.oracle_text}`}
            onLoad={() =>
              setTimeout(() => {
                setDisabledNextButton(false);
              }, 500)
            }
          />
        )}
      </p>

      <button onClick={handleNextAttractionClick} disabled={disabledNextButton}>
        Draw {currentAttraction ? "Next" : "First"} Attraction
      </button>
    </>
  );
}
