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
  taipei: { key: "Taipei", value: "台北市" },
  tainan: { key: "Tainan", value: "台南市" },
  taichung: { key: "Taichung", value: "台中市" },
};

export const GENRES: Genres = {
  food: { key: "food", value: "美食" },
  hotel: { key: "hotel", value: "旅宿" },
  attraction: { key: "attraction", value: "景點" },
  event: { key: "event", value: "活動" },
};

export enum FieldName {
  City = "city",
  Genre = "genre",
  Search = "search",
}
