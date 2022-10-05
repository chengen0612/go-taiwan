export interface Picture {
  url: string;
  description: string;
}

export interface Position {
  lat: number;
  lon: number;
  geohash: string;
}

export interface AnonymousError extends Error {
  code?: number;
}
