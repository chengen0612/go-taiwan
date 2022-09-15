export interface Normalized<T> {
  byID: { [key: string]: T };
  allIDs: string[];
}

/**
 * Return object with byID and allIDs for data searching and mapping.
 * Mainly used to normalize the shape of the state for consistency
 * and efficiency.
 */
export const normalize = <T extends { id: string }>(items: T[]) =>
  items.reduce<Normalized<T>>(
    (acc, item) => {
      const { id } = item;

      acc.byID[id] = item;
      acc.allIDs.push(id);

      return acc;
    },
    { byID: {}, allIDs: [] }
  );
