/* eslint-disable class-methods-use-this */

import {
  parseScenicSpot,
  parseRestaurant,
  parseHotel,
  parseActivity,
} from "./parser";

import type {
  TDXScenicSpot,
  TDXRestaurant,
  TDXHotel,
  TDXActivity,
} from "#/utils/models/tdx";
import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";
import { CITY, CityName } from "#/utils/constants/city";

interface Params {
  [key: string]: string | number | undefined;
}

interface TourismQueryOptions {
  kind: AllessSearchKind;
  city: CityName;
  filter?: string;
  limit?: string;
}

export class TDXService {
  private readonly BASE_API_URL = "https://tdx.transportdata.tw/api/basic";

  private readonly BASE_TOURISM_ROUTE = "v2/Tourism";

  private readonly DEFAULT_LIMIT = 10;

  queryScenicSpot = async (
    options: TourismQueryOptions & { kind: "attraction" }
  ) => {
    const data = await this.query<TDXScenicSpot[]>(options);

    return parseScenicSpot(data);
  };

  queryRestaurant = async (options: TourismQueryOptions & { kind: "food" }) => {
    const data = await this.query<TDXRestaurant[]>(options);

    return parseRestaurant(data);
  };

  queryHotel = async (options: TourismQueryOptions & { kind: "hotel" }) => {
    const data = await this.query<TDXHotel[]>(options);

    return parseHotel(data);
  };

  queryActivity = async (
    options: TourismQueryOptions & { kind: "activity" }
  ) => {
    const data = await this.query<TDXActivity[]>(options);

    return parseActivity(data);
  };

  /**
   * Handle each kind of tourism queries by dynamically constructing
   * the url and query string.
   */
  private query<T>(options: TourismQueryOptions): Promise<T> {
    const { kind, city, filter, limit } = options;

    const { tdxPathname } = SEARCH_KIND.byIndex[kind];
    const { tdxCityName } = CITY.byName[city];

    const urlFragments = [
      this.BASE_API_URL,
      this.BASE_TOURISM_ROUTE,
      tdxPathname,
      tdxCityName,
    ];

    const params: Params = {
      top: limit || this.DEFAULT_LIMIT,
      format: "JSON",
      filter,
    };

    const url = this.getUrl(urlFragments, params);

    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    });
  }

  private getUrl(urlFragments: string[], params: Params) {
    const url = new URL(urlFragments.join("/"));

    Object.entries(params)
      .filter<[string, string | number]>(
        (pair): pair is [string, string | number] =>
          pair[1] !== null && pair[1] !== undefined
      )
      .forEach(([key, value]) =>
        // The key is prefixed with '$' following the OData syntax.
        url.searchParams.append(`$${key}`, value.toString())
      );

    return url;
  }
}
