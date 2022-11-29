/* eslint-disable class-methods-use-this */

import type { SearchKind } from "#/store/slices/search";
import HTTPError from "#/utils/helpers/http-error";
import { getTDXPathName, Kind } from "#/utils/constants/kind";
import { getTDXCityName, CityName } from "#/utils/constants/city";

import { getFilterString, Filter } from "./utils/construct";
import {
  parseScenicSpot,
  parseRestaurant,
  parseHotel,
  parseActivity,
} from "./utils/parse";
import type {
  TDXScenicSpot,
  TDXRestaurant,
  TDXHotel,
  TDXActivity,
  AnyTDXEntity,
} from "./models";

interface UnstableParams {
  [key: string]: string | number | undefined;
}

interface QueryOptions<T extends SearchKind = SearchKind> {
  kind: T;
  city?: CityName;
  filter?: Filter;
  limit?: number;
}

const isAttractionOptions = (
  options: QueryOptions
): options is QueryOptions<"attraction"> => options.kind === "attraction";

const isFoodOptions = (
  options: QueryOptions
): options is QueryOptions<"food"> => options.kind === "food";

const isHotelOptions = (
  options: QueryOptions
): options is QueryOptions<"hotel"> => options.kind === "hotel";

const isActivityOptions = (
  options: QueryOptions
): options is QueryOptions<"activity"> => options.kind === "activity";

export class TDXService {
  private readonly BASE_API_URL = "https://tdx.transportdata.tw/api/basic";

  private readonly BASE_TOURISM_ROUTE = "v2/Tourism";

  private readonly DEFAULT_LIMIT = 10;

  query = (options: QueryOptions<Kind>) => this.switchQuery(options);

  // Find a specific entity by kind and id.
  queryID = (kind: Kind, id: string) =>
    this.switchQuery({ kind, filter: { includedID: id }, limit: 1 });

  queryAll = async (options: QueryOptions<"all">) => {
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

  private getPathname(kind: Kind, city?: CityName) {
    const segments = [
      this.BASE_API_URL,
      this.BASE_TOURISM_ROUTE,
      getTDXPathName(kind),
    ];

    if (city) {
      segments.push(getTDXCityName(city));
    }

    return segments.join("/");
  }

  private getQueryString(options: QueryOptions<Kind>) {
    const { kind, limit, filter } = options;

    const unstableParams: UnstableParams = {
      top: limit || this.DEFAULT_LIMIT,
      format: "JSON",
      filter: getFilterString(kind, filter),
    };

    const stableParams = new URLSearchParams();

    Object.entries(unstableParams)
      .filter<[string, string | number]>(
        (pair): pair is [string, string | number] => Boolean(pair[1])
      )
      .forEach(([key, value]) =>
        stableParams.append(`$${key}`, value.toString())
      );

    return stableParams.toString();
  }

  private getUrl = (pathname: string, queryString: string) =>
    `${pathname}?${queryString}`;

  /**
   * Handle different kind of tourism queries by dynamically constructing urls.
   */
  private primitiveQuery<T extends AnyTDXEntity>(
    options: QueryOptions<Kind>
  ): Promise<T[]> {
    const { kind, city } = options;

    const pathname = this.getPathname(kind, city);
    const queryString = this.getQueryString(options);
    const url = this.getUrl(pathname, queryString);

    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new HTTPError(response.status);
      }

      return response.json();
    });
  }

  private queryScenicSpot = async (options: QueryOptions<"attraction">) => {
    const data = await this.primitiveQuery<TDXScenicSpot>(options);

    return parseScenicSpot(data);
  };

  private queryRestaurant = async (options: QueryOptions<"food">) => {
    const data = await this.primitiveQuery<TDXRestaurant>(options);

    return parseRestaurant(data);
  };

  private queryHotel = async (options: QueryOptions<"hotel">) => {
    const data = await this.primitiveQuery<TDXHotel>(options);

    return parseHotel(data);
  };

  private queryActivity = async (options: QueryOptions<"activity">) => {
    const data = await this.primitiveQuery<TDXActivity>(options);

    return parseActivity(data);
  };

  private switchQuery(options: QueryOptions) {
    if (isAttractionOptions(options)) {
      return this.queryScenicSpot(options);
    }

    if (isFoodOptions(options)) {
      return this.queryRestaurant(options);
    }

    if (isHotelOptions(options)) {
      return this.queryHotel(options);
    }

    if (isActivityOptions(options)) {
      return this.queryActivity(options);
    }

    throw new Error(`Invalid kind property ${options.kind}`);
  }
}
