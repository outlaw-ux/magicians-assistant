export type DieType = `d${number}`;

export interface IDice {
  amount?: number;
  rolls?: number[];
  total?: number;
}

export interface IDiceInHand {
  [key: DieType]: IDice;
}

export interface IDiceResults extends IDiceInHand {
  datetime: Date;
}

export interface IDiceForm {
  diceInHand: IDiceInHand;
  pickUpDice: React.Dispatch<React.SetStateAction<IDiceInHand>>;
  onRoll: () => void;
}
