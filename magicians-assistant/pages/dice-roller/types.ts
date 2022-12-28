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

export interface IDiceInput {
  die?: DieType;
  pickUpDie?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
