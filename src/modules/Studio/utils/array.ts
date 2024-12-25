export const removeItemFromArray = <T>(array: T[], item: T) => {
  return array.filter((i) => JSON.stringify(i) !== JSON.stringify(item));
};
