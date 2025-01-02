export const removeItemFromArray = <T>(array: T[], item: T) => {
  return array.filter((i) => JSON.stringify(i) !== JSON.stringify(item));
};

export const noUndefinedElement = <T>(array: (T | undefined)[]): T[] => {
  return array.filter((i) => i !== undefined) as T[];
};

export const noNullElement = <T>(array: (T | null)[]): T[] => {
  return array.filter((i) => i !== null) as T[];
};
