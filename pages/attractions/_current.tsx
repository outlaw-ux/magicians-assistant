import { useState } from "react";
import Card from "../../components/Card";
import { useAttractionsContext } from "../../context";

export default function CurrentAttractions() {
  const { currentAttractions, drawNextCard, sendToJunkyard } =
    useAttractionsContext();
  const [disabledNextButton, setDisabledNextButton] = useState(false);

  const handleNextAttractionClick = () => {
    setDisabledNextButton(true);
    drawNextCard();
  };

  const reverseCurrentAttractions = [...currentAttractions].reverse();

  return (
    <>
      <h2>Current Attractions</h2>

      <button onClick={handleNextAttractionClick} disabled={disabledNextButton}>
        Visit New Attraction
      </button>

      {reverseCurrentAttractions.map((attraction) => {
        const imagePath = attraction?.image_uris?.normal;
        return (
          <div key={attraction?.id}>
            <p>
              <strong>{attraction?.name}</strong>
            </p>
            <p>
              {imagePath && (
                <Card
                  src={imagePath}
                  alt={`${attraction?.oracle_text}`}
                  onLoad={() =>
                    setTimeout(() => {
                      setDisabledNextButton(false);
                    }, 500)
                  }
                />
              )}
            </p>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to send '${attraction?.name}' to the Junkyard?`
                  )
                ) {
                  sendToJunkyard(attraction?.id);
                }
              }}
            >
              Send &apos;{attraction?.name}&apos; to Junkyard
            </button>
          </div>
        );
      })}
    </>
  );
}
