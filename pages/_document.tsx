import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <hr />
      <footer>
        <p>
          <small>
            The literal and graphical information presented on this site about
            Magic: The Gathering, including card images, mana symbols, and
            Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of
            Hasbro, Inc.
          </small>
        </p>
        <p>
          <small>
            Portions of content & imagery for Magic: The Gathering is provided
            by Scryfall API and is not associated with this.
          </small>
        </p>
        <p>
          <small>&copy; Kyle Knight for all the other things</small>
        </p>
      </footer>
    </Html>
  );
}
