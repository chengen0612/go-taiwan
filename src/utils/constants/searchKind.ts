const SEARCH_KIND_TABLE = {
  all: { key: "all", value: "全部" },
  attraction: { key: "attraction", value: "景點", color: "kind.attraction" },
  food: { key: "food", value: "美食", color: "kind.food" },
  hotel: { key: "hotel", value: "旅宿", color: "kind.hotel" },
  activity: { key: "activity", value: "活動", color: "kind.activity" },
} as const;

export type SearchKind = keyof typeof SEARCH_KIND_TABLE;

export type AllessSearchKind = Exclude<SearchKind, "all">;

export const SEARCH_KIND = {
  byIndex: SEARCH_KIND_TABLE,
  all: Object.values(SEARCH_KIND_TABLE),
  allKinds: Object.keys(SEARCH_KIND_TABLE),
};
