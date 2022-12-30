import Head from "next/head";
import { useState } from "react";
import Navigation from "../../components/Navigation";

const LifeButton = ({
  value,
  changeLife,
}: {
  value: number;
  changeLife: (value: number) => void;
}) => {
  const visualValue = value <= 0 ? value : `+${value}`;
  return (
    <button type="button" onClick={() => changeLife(value)}>
      {visualValue}
    </button>
  );
};

export default function LifeTrackerPage() {
  const [currentLife, setCurrentLife] = useState(20);
  const changeLife = (lifeChange: number) => {
    setCurrentLife((life) => life + lifeChange);
  };

  return (
    <>
      <Head>
        <title>Life Tracker :: Magicians Assistant</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Life Tracker</h1>
        <Navigation />
        <p>
          Current Life:{" "}
          <input type="text" pattern="[0-9]" value={currentLife} />
        </p>
        <p>
          Add Life: <LifeButton value={1} changeLife={changeLife} />{" "}
          <LifeButton value={5} changeLife={changeLife} />{" "}
          <LifeButton value={10} changeLife={changeLife} />
        </p>
        <p>
          Remove Life: <LifeButton value={-1} changeLife={changeLife} />{" "}
          <LifeButton value={-5} changeLife={changeLife} />{" "}
          <LifeButton value={-10} changeLife={changeLife} />
        </p>
      </main>
    </>
  );
}
