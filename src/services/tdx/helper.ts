import { AllessSearchKind, SEARCH_KIND } from "#/utils/constants/searchKind";
import { CityName, CITY } from "#/utils/constants/city";

/**
 * Create event period for activity entity.
 * Both parameters should be a valid time string.
 */
export const getPeriod = (startTime: string, endTime: string) =>
  [startTime, endTime]
    .map((value) => new Date(value).toLocaleDateString("zh-TW"))
    .join(" - ");

/**
 * Map tdx tourism pathname with kind property.
 */
export const getTDXPathName = (kind: AllessSearchKind) =>
  SEARCH_KIND.byIndex[kind].tdxPathname;

/**
 * Map tdx city name with cityName property.
 */
export const getTDXCityName = (city: CityName) => CITY.byName[city].tdxCityName;

/**
 * Construct name filter by tdx pathname and OData syntax.
 * Return string represent name filter or undefined if keyword is unset.
 *
 * Example: contains(RestaurantName,'港式')
 */
const getNameFilter = (kind: AllessSearchKind, keyword: string) => {
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
const getIDFilter = (kind: AllessSearchKind, excludedID: string) => {
  const pathname = getTDXPathName(kind);

  return `${pathname}ID ne '${excludedID}'`;
};

export interface Filter {
  keyword?: string;
  excludedID?: string;
}

/**
 * Convert Filter object to filter string.
 */
export const getFilterString = (
  kind: AllessSearchKind,
  filter: Filter | undefined
): string | undefined => {
  if (!filter) return undefined;

  const { keyword, excludedID } = filter;

  let filterString: string | undefined;

  if (keyword) {
    filterString = getNameFilter(kind, keyword);
  }

  if (excludedID) {
    filterString = getIDFilter(kind, excludedID);
  }

  return filterString;
};
