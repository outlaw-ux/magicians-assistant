import Link from 'next/link';

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/schemes">Schemes</Link>
      </li>
      <li>
        <Link href="/attractions">Unfinity Attractions</Link>
      </li>
      <li>
        <Link href="/counters">Counter Manager</Link>
      </li>
      <li>
        <Link href="/tokens">Token Manager</Link>
      </li>
      <li>
        <Link href="/dice-roller">Dice Roller</Link>
      </li>
      <li>
        <Link href="/life-tracker">Life Tracker</Link>
      </li>
    </ul>
  );
}
