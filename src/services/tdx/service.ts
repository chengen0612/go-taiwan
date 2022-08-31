/* eslint-disable class-methods-use-this */

import type {
  TourismQueryKind,
  TourismQueryOption,
  TourismQueryAllOption,
} from "#/store/slices/search";

import type {
  TDXScenicSpot,
  TDXRestaurant,
  TDXHotel,
  TDXActivity,
} from "#/utils/models/tdx";
import { CITY } from "#/utils/constants/search";

interface Params {
  [key: string]: string | number;
}

/** Map kind property to pathname of TDX tourism services. */
const kindPathnameMap: Record<TourismQueryKind, string> = {
  attraction: "ScenicSpot",
  food: "Restaurant",
  hotel: "Hotel",
  activity: "Activity",
};

export class TDXService {
  private readonly BASE_API_URL = "https://tdx.transportdata.tw/api/basic";

  private readonly BASE_TOURISM_ROUTE = "v2/Tourism";

  private readonly DEFAULT_LIMIT = 10;

  /**
   * Specify the type of return value of each conditions,
   * letting developer get type support without having to manually setting it.
   */
  query(options: TourismQueryOption<"attraction">): Promise<TDXScenicSpot[]>;
  query(options: TourismQueryOption<"food">): Promise<TDXRestaurant[]>;
  query(options: TourismQueryOption<"hotel">): Promise<TDXHotel[]>;
  query(options: TourismQueryOption<"activity">): Promise<TDXActivity[]>;
  query(options: TourismQueryOption<TourismQueryKind>): Promise<unknown> {
    const { kind, city, keyword } = options;

    const pathname = kindPathnameMap[kind];
    const { tdxCityName } = CITY.byName[city];

    /**
     * The name field of each kind of data is the combination of
     * pathname and 'Name' string.
     *
     * The actual phrases used by name filter looks like below:
     *
     * 1. $filter=contains(ScenicSpotName,'@keyword')
     * 2. $filter=contains(RestaurantName,'@keyword')
     */
    const nameField = `${pathname}Name`;

    const urlFragments = [
      this.BASE_API_URL,
      this.BASE_TOURISM_ROUTE,
      pathname,
      tdxCityName,
    ];

    const params: Params = {
      top: this.DEFAULT_LIMIT,
      format: "JSON",
    };

    if (keyword.length > 0)
      params.filter = this.getFilterString(nameField, keyword);

    const url = this.getUrl(urlFragments, params);

    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    });
  }

  queryAll(options: TourismQueryAllOption) {
    return Promise.all([
      this.query({ kind: "attraction", ...options }),
      this.query({ kind: "food", ...options }),
      this.query({ kind: "hotel", ...options }),
      this.query({ kind: "activity", ...options }),
    ]);
  }

  private getFilterString(fieldName: string, keyword: string) {
    return `contains(${fieldName},'${keyword}')`;
  }

  private getUrl(urlFragments: string[], params: Params) {
    const url = new URL(urlFragments.join("/"));

    Object.entries(params).forEach(([key, value]) =>
      // The key is prefixed with '$' following the OData syntax.
      url.searchParams.append(`$${key}`, value.toString())
    );

    return url;
  }
}
