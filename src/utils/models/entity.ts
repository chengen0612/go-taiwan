import { Kind } from "#/utils/constants/kind";
import { CityName } from "#/utils/constants/city";

import type { Picture, Position } from "#/utils/models/base";

export interface EntityBase {
  kind: Kind;
  id: string;
  title: string;
  address?: string;
  description?: string;
  pictures: Picture[];
  position: Position;
  categories: string[]; // tags
  phone?: string;
  city: CityName;
  websiteUrl?: string;
}

export interface ScenicSpotEntity extends EntityBase {
  kind: "attraction";
  openTime?: string; // unformatted data
}

export interface RestaurantEntity extends EntityBase {
  kind: "food";
  openTime?: string; // unformatted data
}

export interface HotelEntity extends EntityBase {
  kind: "hotel";
  parkingInfo?: string;
}

export interface ActivityEntity extends EntityBase {
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

export type AnyEntity =
  | ScenicSpotEntity
  | RestaurantEntity
  | HotelEntity
  | ActivityEntity;

export interface KindEntityMap {
  attraction: ScenicSpotEntity;
  food: RestaurantEntity;
  hotel: HotelEntity;
  activity: ActivityEntity;
}
