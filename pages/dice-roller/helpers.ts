import { DieType, IDiceInHand } from './types';

export const STANDARD_DICE: DieType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

export const DEFAULT_DICE_IN_HAND: IDiceInHand = {};

STANDARD_DICE.forEach((die) => {
  DEFAULT_DICE_IN_HAND[die] = {};
});
