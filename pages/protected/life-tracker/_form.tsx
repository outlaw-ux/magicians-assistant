import { useState } from "react";
import { useLifeContext } from "../../context";
import LifeButton from "./_life-button";

export default function LifeForm() {
  const { currentLife } = useLifeContext();
  const [customChange, setCustomChange] = useState(0);

  return (
    <>
      <p>
        Current Life:{" "}
        <input type="number" pattern="[0-9]+" value={currentLife} readOnly />
      </p>
      <p>
        Add Life: <LifeButton value={1} /> <LifeButton value={5} />{" "}
        <LifeButton value={10} />
      </p>
      <p>
        Remove Life: <LifeButton value={-1} /> <LifeButton value={-5} />{" "}
        <LifeButton value={-10} />
      </p>
      <p>
        Change Life:{" "}
        <input
          type="number"
          pattern="[0-9]+"
          onChange={(event) => setCustomChange(Number(event?.target.value))}
        />{" "}
        <LifeButton value={customChange} label="Increase" />
        <LifeButton value={customChange * -1} label="Decrease" />
      </p>
    </>
  );
}
