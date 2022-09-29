const SEARCH_KIND_TABLE = {
  all: { key: "all", value: "全部" },
  attraction: {
    key: "attraction",
    value: "景點",
    color: "kind.attraction",
    tdxPathname: "ScenicSpot", // pathname of tdx tourism service
  },
  food: {
    key: "food",
    value: "美食",
    color: "kind.food",
    tdxPathname: "Restaurant", // pathname of tdx tourism service
  },
  hotel: {
    key: "hotel",
    value: "旅宿",
    color: "kind.hotel",
    tdxPathname: "Hotel", // pathname of tdx tourism service
  },
  activity: {
    key: "activity",
    value: "活動",
    color: "kind.activity",
    tdxPathname: "Activity", // pathname of tdx tourism service
  },
} as const;

export type SearchKind = keyof typeof SEARCH_KIND_TABLE;

export type AllessSearchKind = Exclude<SearchKind, "all">;

export const SEARCH_KIND = {
  byIndex: SEARCH_KIND_TABLE,
  all: Object.values(SEARCH_KIND_TABLE),
  allKinds: Object.keys(SEARCH_KIND_TABLE) as SearchKind[],
};

export const getKindValue = (kind: AllessSearchKind) =>
  SEARCH_KIND.byIndex[kind].value;
