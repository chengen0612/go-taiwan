interface ObjectSignature<T> {
  [key: string]: T;
}

export interface Option {
  key: string;
  value: string;
}

type Cities = ObjectSignature<Option>;

type Genres = ObjectSignature<Option>;

export const CITIES: Cities = {
  TAIPEI: { key: "Taipei", value: "台北市" },
  TAINAN: { key: "Tainan", value: "台南市" },
  TAICHUNG: { key: "Taichung", value: "台中市" },
};

export const GENRES: Genres = {
  FOOD: { key: "food", value: "美食" },
  HOTEL: { key: "hotel", value: "旅宿" },
  ATTRACTION: { key: "attraction", value: "景點" },
  EVENT: { key: "event", value: "活動" },
};

export enum FieldName {
  City = "city",
  Genre = "genre",
  Query = "query",
}
