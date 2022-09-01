const SEARCH_KIND_TABLE = {
  all: { key: "all", value: "全部" },
  food: { key: "food", value: "美食" },
  hotel: { key: "hotel", value: "旅宿" },
  attraction: { key: "attraction", value: "景點" },
  activity: { key: "activity", value: "活動" },
} as const;

export type SearchKind = keyof typeof SEARCH_KIND_TABLE;

export type AllessSearchKind = Exclude<SearchKind, "all">;

export const SEARCH_KIND = {
  byIndex: SEARCH_KIND_TABLE,
  all: Object.values(SEARCH_KIND_TABLE),
  allKinds: Object.keys(SEARCH_KIND_TABLE),
};
