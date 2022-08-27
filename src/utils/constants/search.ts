export enum SearchProperty {
  City = "city", // Which city ?
  Kind = "kind", // What kind of data ?
  Keyword = "keyword", // Keyword filter .
}

export interface Option {
  [key: string]: unknown;
  key: string;
  value: string;
}

/* City */
const CITY_MAP = {
  taipei: { key: "taipei", value: "台北市", tdxCityName: "Taipei" },
  tainan: { key: "tainan", value: "台南市", tdxCityName: "Tainan" },
  taichung: { key: "taichung", value: "台中市", tdxCityName: "Taichung" },
} as const;

export type CityName = keyof typeof CITY_MAP;
export type TDXCityName = typeof CITY_MAP[CityName]["tdxCityName"];

export const CITY = { byName: CITY_MAP, all: Object.values(CITY_MAP) };

/* Kind */
const KIND_MAP = {
  all: { key: "all", value: "全部" },
  food: { key: "food", value: "美食" },
  hotel: { key: "hotel", value: "旅宿" },
  attraction: { key: "attraction", value: "景點" },
  activity: { key: "activity", value: "活動" },
} as const;

export type SearchKind = keyof typeof KIND_MAP;

export const KIND = {
  byIndex: KIND_MAP,
  all: Object.values(KIND_MAP),
  allKinds: Object.keys(KIND_MAP),
};
