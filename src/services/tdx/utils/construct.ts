import { getTDXPathName, Kind } from "#/utils/constants/kind";

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
const getNameFilter = (kind: Kind, keyword: string) => {
  if (keyword.length === 0) return undefined;

  const pathname = getTDXPathName(kind);

  return `contains(${pathname}Name,'${keyword}')`;
};

/**
 * Construct id filter by tdx pathname and OData syntax.
 * Return string represent id filter.
 *
 * Example: ScenicSpotID ne 'C1_313020000G_000026'
 */
const getExcludeIDFilter = (kind: Kind, excludedID: string) => {
  const pathname = getTDXPathName(kind);

  return `${pathname}ID ne '${excludedID}'`;
};

const getIncludeIDFilter = (kind: Kind, includedID: string) => {
  const pathname = getTDXPathName(kind);

  return `${pathname}ID eq '${includedID}'`;
};

export interface Filter {
  keyword?: string;
  excludedID?: string;
  includedID?: string;
}

/**
 * Convert Filter object to filter string.
 */
export const getFilterString = (
  kind: Kind,
  filter: Filter | undefined
): string | undefined => {
  if (!filter) return undefined;

  const { keyword, excludedID, includedID } = filter;

  let filterString: string | undefined;

  if (keyword) {
    filterString = getNameFilter(kind, keyword);
  }

  if (excludedID) {
    filterString = getExcludeIDFilter(kind, excludedID);
  }

  if (includedID) {
    filterString = getIncludeIDFilter(kind, includedID);
  }

  return filterString;
};
