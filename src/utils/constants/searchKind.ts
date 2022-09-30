const SEARCH_KIND_TABLE = {
  attraction: {
    key: "attraction",
    value: "景點",
    tdxPathname: "ScenicSpot",
  },
  food: {
    key: "food",
    value: "美食",
    tdxPathname: "Restaurant",
  },
  hotel: {
    key: "hotel",
    value: "旅宿",
    tdxPathname: "Hotel",
  },
  activity: {
    key: "activity",
    value: "活動",
    tdxPathname: "Activity",
  },
} as const;

export type Kind = keyof typeof SEARCH_KIND_TABLE;

export type AllessSearchKind = Kind;

export const SEARCH_KIND = {
  byKind: SEARCH_KIND_TABLE,
  all: Object.values(SEARCH_KIND_TABLE),
  allKinds: Object.keys(SEARCH_KIND_TABLE) as Kind[],
};

export const getKindValue = (kind: AllessSearchKind) =>
  SEARCH_KIND.byKind[kind].value;

export const getTDXPathName = (kind: AllessSearchKind) =>
  SEARCH_KIND.byKind[kind].tdxPathname;
