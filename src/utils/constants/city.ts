const CITY_TABLE = {
  taipei: { key: "taipei", value: "台北市", tdxCityName: "Taipei" },
  tainan: { key: "tainan", value: "台南市", tdxCityName: "Tainan" },
  taichung: { key: "taichung", value: "台中市", tdxCityName: "Taichung" },
} as const;

export type CityName = keyof typeof CITY_TABLE;

export const CITY = { byName: CITY_TABLE, all: Object.values(CITY_TABLE) };
