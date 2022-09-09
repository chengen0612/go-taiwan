import { AllessSearchKind } from "#/utils/constants/searchKind";

export interface EntityPicture {
  url: string;
  description: string;
}

export interface EntityPosition {
  lat: number;
  lon: number;
  geohash: string;
}

export interface AnyEntity {
  kind: AllessSearchKind;
  id: string;
  title: string;
  address?: string;
  description?: string;
  pictures: EntityPicture[];
  position: EntityPosition;
  categories: string[]; // tags
  phone?: string;
  city: string;
  websiteUrl?: string;
}

export interface ScenicSpotEntity extends AnyEntity {
  kind: "attraction";
  openTime?: string; // unformatted data
}

export interface RestaurantEntity extends AnyEntity {
  kind: "food";
  openTime?: string; // unformatted data
}

export interface HotelEntity extends AnyEntity {
  kind: "hotel";
  parkingInfo?: string;
}

export interface ActivityEntity extends AnyEntity {
  kind: "activity";
  organizer: string;
  startTime: string; // date string
  endTime: string; // date string
  isRegular: boolean;
  regularInfo?: string;
  parkingInfo?: string;
  charge?: string;
  remarks?: string;
}
