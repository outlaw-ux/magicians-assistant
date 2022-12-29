/** Accepts number of sides on dice and returns a number */
const roll = (sides: number): number =>
  Number(Math.floor(Math.random() * sides) + 1);

export default roll;
