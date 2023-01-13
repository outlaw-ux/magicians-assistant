import Link from "next/link";
import Navigation from "../../components/Navigation";
import AttractionsDeck from "./_deck";

export default function AttractionsPage() {
  return (
    <div id="attractions-page">
      <Navigation />
      <h2>Attractions</h2>
      <ul>
        <li>
          <Link href="/attractions/customize">Customize Deck</Link>
        </li>
      </ul>

      <AttractionsDeck />
    </div>
  );
}
