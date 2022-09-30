const KIND_TABLE = {
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

export type Kind = keyof typeof KIND_TABLE;

export const KIND = {
  byKind: KIND_TABLE,
  allKinds: Object.keys(KIND_TABLE) as Kind[],
  all: Object.values(KIND_TABLE),
};

export const getKindValue = (kind: Kind) => KIND.byKind[kind].value;

export const getTDXPathName = (kind: Kind) => KIND.byKind[kind].tdxPathname;
