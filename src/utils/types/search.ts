export enum SearchProperty {
  City = "city", // Which city ?
  Kind = "kind", // What kind of data ?
  Keyword = "keyword", // Keyword filter
}

export interface Option {
  [key: string]: unknown;
  key: string;
  value: string;
}
