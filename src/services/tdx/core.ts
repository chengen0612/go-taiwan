/* eslint-disable class-methods-use-this */

import {
  parseScenicSpot,
  parseRestaurant,
  parseHotel,
  parseActivity,
} from "./parser";

import type { SearchOptions } from "#/store/slices/search";

import type {
  TDXScenicSpot,
  TDXRestaurant,
  TDXHotel,
  TDXActivity,
} from "#/utils/models/tdx";
import { CITY } from "#/utils/constants/city";
import { AllessSearchKind } from "#/utils/constants/searchKind";

interface Params {
  [key: string]: string | number;
}

/** Map kind property to pathname of TDX tourism services. */
const kindPathnameMap: Record<AllessSearchKind, string> = {
  attraction: "ScenicSpot",
  food: "Restaurant",
  hotel: "Hotel",
  activity: "Activity",
};

export class TDXService {
  private readonly BASE_API_URL = "https://tdx.transportdata.tw/api/basic";

  private readonly BASE_TOURISM_ROUTE = "v2/Tourism";

  private readonly DEFAULT_LIMIT = 10;

  queryScenicSpot = async (options: SearchOptions<"attraction">) => {
    const data = await this.query<TDXScenicSpot[]>(options);

    return parseScenicSpot(data);
  };

  queryRestaurant = async (options: SearchOptions<"food">) => {
    const data = await this.query<TDXRestaurant[]>(options);

    return parseRestaurant(data);
  };

  queryHotel = async (options: SearchOptions<"hotel">) => {
    const data = await this.query<TDXHotel[]>(options);

    return parseHotel(data);
  };

  queryActivity = async (options: SearchOptions<"activity">) => {
    const data = await this.query<TDXActivity[]>(options);

    return parseActivity(data);
  };

  queryAll = async (options: SearchOptions<"all">) => {
    const data = await Promise.all([
      this.queryScenicSpot({ ...options, kind: "attraction" }),
      this.queryRestaurant({ ...options, kind: "food" }),
      this.queryHotel({ ...options, kind: "hotel" }),
      this.queryActivity({ ...options, kind: "activity" }),
    ]);

    return {
      attraction: data[0],
      food: data[1],
      hotel: data[2],
      activity: data[3],
    };
  };

  /**
   * Handle each kind of tourism queries by dynamically constructing
   * the url and query string.
   */
  private query<T>(options: SearchOptions<AllessSearchKind>): Promise<T> {
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
