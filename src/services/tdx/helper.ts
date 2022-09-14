import { AllessSearchKind, SEARCH_KIND } from "#/utils/constants/searchKind";

/**
 * Create event period for activity entity.
 * Both parameters should be a valid time string.
 */
export const getPeriod = (startTime: string, endTime: string) =>
  [startTime, endTime]
    .map((value) => new Date(value).toLocaleDateString("zh-TW"))
    .join(" - ");

/**
 * Construct name filter by tdx pathname and OData syntax.
 * Return string represent name filter or undefined if keyword is unset.
 *
 * Example: contains(RestaurantName,'港式')
 */
export const getNameFilter = (kind: AllessSearchKind, keyword: string) => {
  if (keyword.length === 0) return undefined;

  const { tdxPathname } = SEARCH_KIND.byIndex[kind];

  return `contains(${tdxPathname}Name,'${keyword}')`;
};

/**
 * Construct id filter by tdx pathname and OData syntax.
 * Return string represent id filter.
 *
 * Example: ScenicSpotID ne 'C1_313020000G_000026'
 */
export const getIDFilter = (kind: AllessSearchKind, excludedID: string) => {
  const { tdxPathname } = SEARCH_KIND.byIndex[kind];

  return `${tdxPathname}ID ne '${excludedID}'`;
};
