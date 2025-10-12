export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomItem = <T>(items: ReadonlyArray<T>): T =>
  items[getRandomInt(0, items.length - 1)];

export const getRandomFloat = (min: number, max: number, decimals = 1): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

export const getRandomBoolean = (): boolean => Math.random() > 0.5;
