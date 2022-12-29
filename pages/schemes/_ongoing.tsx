import { useSchemesContext } from "../../context";

const filteredStrings = [
  "(An ongoing scheme remains face up until it's abandoned.)\n",
  "(An ongoing scheme remains face up.)\n",
];

export default function OngoingSchemes() {
  const { ongoingSchemes, setOngoingSchemes } = useSchemesContext();

  return (
    <ul>
      {ongoingSchemes?.map((scheme) => {
        let oracleText = scheme.oracle_text;
        filteredStrings.forEach((filter) => {
          oracleText = oracleText?.replace(filter, "");
        });

        return (
          <li key={scheme.id}>
            <p>
              <strong>{scheme.name}</strong>
            </p>
            <p>{oracleText}</p>
            <p>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure this scheme is ready to be abandoned?"
                    )
                  ) {
                    const filteredOngoingSchemes = ongoingSchemes.filter(
                      (filteringScheme) => scheme.id !== filteringScheme.id
                    );
                    setOngoingSchemes(filteredOngoingSchemes);
                  }
                }}>
                Abandon
              </button>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
