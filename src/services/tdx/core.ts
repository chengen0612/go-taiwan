/* eslint-disable class-methods-use-this */
import { getFilterString, Filter } from "./helper";
import { getTDXPathName, AllessSearchKind } from "#/utils/constants/searchKind";
import { getTDXCityName } from "#/utils/constants/city";
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
  AnyTDXEntity,
} from "#/utils/models/tdx";
import { SearchOptions, SearchKind } from "#/store/slices/search";

interface Params {
  [key: string]: string | number | undefined;
}

interface QueryOptions extends Omit<SearchOptions<SearchKind>, "keyword"> {
  filter?: Filter;
  limit?: number;
}

export class TDXService {
  private readonly BASE_API_URL = "https://tdx.transportdata.tw/api/basic";

  private readonly BASE_TOURISM_ROUTE = "v2/Tourism";

  private readonly DEFAULT_LIMIT = 10;

  query = (options: QueryOptions & { kind: AllessSearchKind }) => {
    const { kind } = options;

    switch (kind) {
      case "attraction":
        return this.queryScenicSpot(
          options as QueryOptions & { kind: "attraction" }
        );

      case "food":
        return this.queryRestaurant(options as QueryOptions & { kind: "food" });

      case "hotel":
        return this.queryHotel(options as QueryOptions & { kind: "hotel" });

      case "activity":
        return this.queryActivity(
          options as QueryOptions & { kind: "activity" }
        );

      default: {
        // eslint-disable-next-line no-underscore-dangle
        const _exhaustedCheck: never = kind;

        return _exhaustedCheck;
      }
    }
  };

  queryAll = async (options: QueryOptions & { kind: "all" }) => {
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

  queryID = (kind: AllessSearchKind, id: string) => {
    const tdxPathname = getTDXPathName(kind);

    const urlFragments = [
      this.BASE_API_URL,
      this.BASE_TOURISM_ROUTE,
      tdxPathname,
    ];

    const params: Params = {
      format: "json",
      filter: getFilterString(kind, { includedID: id }),
    };

    const url = this.getUrl(urlFragments, params);

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data: AnyTDXEntity[]) => {
        switch (kind) {
          case "attraction":
            return parseScenicSpot(data as TDXScenicSpot[]);

          case "food":
            return parseRestaurant(data as TDXRestaurant[]);

          case "hotel":
            return parseHotel(data as TDXHotel[]);

          case "activity":
            return parseActivity(data as TDXActivity[]);

          default:
            throw new Error(`Invalid kind property ${kind}`);
        }
      });
  };

  private queryScenicSpot = async (
    options: QueryOptions & { kind: "attraction" }
  ) => {
    const data = await this.queryBase<TDXScenicSpot[]>(options);

    return parseScenicSpot(data);
  };

  private queryRestaurant = async (
    options: QueryOptions & { kind: "food" }
  ) => {
    const data = await this.queryBase<TDXRestaurant[]>(options);

    return parseRestaurant(data);
  };

  private queryHotel = async (options: QueryOptions & { kind: "hotel" }) => {
    const data = await this.queryBase<TDXHotel[]>(options);

    return parseHotel(data);
  };

  private queryActivity = async (
    options: QueryOptions & { kind: "activity" }
  ) => {
    const data = await this.queryBase<TDXActivity[]>(options);

    return parseActivity(data);
  };

  /**
   * Handle each kind of tourism queries by dynamically constructing
   * the url and query string.
   */
  private queryBase<T>(
    options: QueryOptions & { kind: AllessSearchKind }
  ): Promise<T> {
    const { kind, city, filter, limit } = options;

    const tdxPathname = getTDXPathName(kind);
    const tdxCityName = getTDXCityName(city);

    const urlFragments = [
      this.BASE_API_URL,
      this.BASE_TOURISM_ROUTE,
      tdxPathname,
      tdxCityName,
    ];

    const params: Params = {
      top: limit || this.DEFAULT_LIMIT,
      format: "JSON",
      filter: getFilterString(kind, filter),
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
        (pair): pair is [string, string | number] => pair[1] !== undefined
      )
      .forEach(([key, value]) =>
        // The key is prefixed with '$' following the OData syntax.
        url.searchParams.append(`$${key}`, value.toString())
      );

    return url;
  }
}
