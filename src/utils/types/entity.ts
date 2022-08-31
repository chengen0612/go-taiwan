export interface EntityPicture {
  url: string;
  description?: string;
}

export interface EntityPosition {
  lat: number;
  lon: number;
  geohash: string;
}

/* An annotation for typescript to identify different kind of Entities. */
export enum EntityKind {
  Attraction = "attraction",
  Food = "food",
  Hotel = "hotel",
  Activity = "activity",
}

interface AnyEntity {
  kind: EntityKind;
  id: string;
  name: string;
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
  kind: EntityKind.Attraction;
  openTime?: string; // unformatted data
}

export interface RestaurantEntity extends AnyEntity {
  kind: EntityKind.Food;
  openTime?: string; // unformatted data
}

export interface HotelEntity extends AnyEntity {
  kind: EntityKind.Hotel;
  parkingInfo?: string;
}

export interface ActivityEntity extends AnyEntity {
  kind: EntityKind.Activity;
  organizer: string;
  startTime: string;
  endTime: string;
  isRegular: boolean;
  regularInfo?: string;
  parkingInfo?: string;
  charge?: string;
  remarks?: string;
}
