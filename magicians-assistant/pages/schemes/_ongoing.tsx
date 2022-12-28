import type { Card } from 'scryfall-api';

export default function OngoingSchemes({
  schemes,
  setSchemes,
}: {
  schemes: Card[];
  setSchemes: React.Dispatch<React.SetStateAction<Card[]>>;
}) {
  return (
    <ul>
      {schemes.map((scheme) => (
        <li key={scheme.id}>
          <p>
            <strong>{scheme.name}</strong>
          </p>
          <p>{scheme.oracle_text}</p>
          <p>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure this scheme is ready to be abandoned?'
                  )
                ) {
                  const filteredOngoingSchemes = schemes.filter(
                    (filteringScheme) => scheme.id !== filteringScheme.id
                  );
                  setSchemes(filteredOngoingSchemes);
                }
              }}
            >
              Abandon
            </button>
          </p>
        </li>
      ))}
    </ul>
  );
}
