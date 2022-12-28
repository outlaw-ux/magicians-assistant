import { IDiceInput } from './types';

export default function DiceInput({ die, pickUpDie, value }: IDiceInput) {
  return (
    <p>
      <input
        type="number"
        name={die}
        value={value}
        min="0"
        max="10"
        onChange={pickUpDie}
      />
      <strong>{die}</strong>
    </p>
  );
}
