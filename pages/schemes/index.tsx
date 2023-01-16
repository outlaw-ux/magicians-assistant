import Link from "next/link";
import Navigation from "../../components/Navigation";
import SchemesDeck from "./_deck";

export default function SchemesPage() {
  return (
    <div id="schemes-page">
      <Navigation />
      <h2>Schemes</h2>
      <ul>
        <li>
          <Link href="/schemes/customize">Customize Deck</Link>
        </li>
      </ul>

      <SchemesDeck />
    </div>
  );
}
