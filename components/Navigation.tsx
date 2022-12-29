import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/schemes">Archenemy Schemes</Link>
        </li>
        <li>
          Unfinity
          <ul>
            <li>
              <Link href="/attractions">Attractions</Link>
            </li>
            <li>
              <Link href="/stickers">Stickers</Link>
            </li>
          </ul>
        </li>
        {/* <li>
          <Link href="/counters">Counter Manager</Link>
        </li> */}
        {/* <li>
          <Link href="/tokens">Token Manager</Link>
        </li> */}
        <li>
          <Link href="/dice-roller">Dice Roller</Link>
        </li>
        {/* <li>
          <Link href="/life-tracker">Life Tracker</Link>
        </li> */}
        {/* <li>
          <Link href="/treachery">Treachery</Link>
        </li> */}
      </ul>

      <hr />
    </>
  );
}