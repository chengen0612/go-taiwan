import type {
  TDXPicture,
  TDXPosition,
  TDXScenicSpot,
  TDXRestaurant,
  TDXHotel,
  TDXActivity,
} from "#/utils/models/tdx";

import type {
  EntityPicture,
  EntityPosition,
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
} from "#/utils/types/entity";

const createPicture = (url: string, description: string): EntityPicture => ({
  url,
  description,
});

const parsePictures = (picture: TDXPicture): EntityPicture[] => {
  type Pair = [string, string];

  const pairs: Pair[] = [];

  if (picture.PictureUrl1 && picture.PictureDescription1) {
    pairs.push([picture.PictureUrl1, picture.PictureDescription1]);
  }

  if (picture.PictureUrl2 && picture.PictureDescription2) {
    pairs.push([picture.PictureUrl2, picture.PictureDescription2]);
  }

  if (picture.PictureUrl3 && picture.PictureDescription3) {
    pairs.push([picture.PictureUrl3, picture.PictureDescription3]);
  }

  return pairs.map((pair) => createPicture(...pair));
};

const parsePosition = (position: TDXPosition): EntityPosition => ({
  lat: position.PositionLat,
  lon: position.PositionLon,
  geohash: position.GeoHash,
});

const parseClasses = (...args: (string | undefined)[]) =>
  args.filter<string>((value): value is string => !!value);

const parseScenicSpot = (items: TDXScenicSpot[]): ScenicSpotEntity[] =>
  items.map((item) => ({
    kind: "attraction",
    id: item.ScenicSpotID,
    title: item.ScenicSpotName,
    address: item.Address,
    description: item.DescriptionDetail || item.Description,
    pictures: parsePictures(item.Picture),
    position: parsePosition(item.Position),
    websiteUrl: item.WebsiteUrl,
    categories: parseClasses(item.Class1, item.Class2, item.Class3),
    city: item.City,
    phone: item.Phone,
    openTime: item.OpenTime,
  }));

const parseRestaurant = (items: TDXRestaurant[]): RestaurantEntity[] =>
  items.map((item) => ({
    kind: "food",
    id: item.RestaurantID,
    title: item.RestaurantName,
    address: item.Address,
    description: item.Description,
    pictures: parsePictures(item.Picture),
    position: parsePosition(item.Position),
    websiteUrl: item.WebsiteUrl,
    categories: parseClasses(item.Class),
    city: item.City,
    phone: item.Phone,
    openTime: item.OpenTime,
  }));

const parseHotel = (items: TDXHotel[]): HotelEntity[] =>
  items.map((item) => ({
    kind: "hotel",
    id: item.HotelID,
    title: item.HotelName,
    address: item.Address,
    description: item.Description,
    pictures: parsePictures(item.Picture),
    position: parsePosition(item.Position),
    websiteUrl: item.WebsiteUrl,
    categories: parseClasses(item.Class),
    city: item.City,
    phone: item.Phone,
    parkingInfo: item.ParkingInfo,
  }));

const parseActivity = (items: TDXActivity[]): ActivityEntity[] =>
  items.map((item) => ({
    kind: "activity",
    id: item.ActivityID,
    title: item.ActivityName,
    address: item.Address || item.Location,
    description: item.Description,
    pictures: parsePictures(item.Picture),
    position: parsePosition(item.Position),
    websiteUrl: item.WebsiteUrl,
    categories: parseClasses(item.Class1, item.Class2),
    city: item.City,
    phone: item.Phone,
    startTime: item.StartTime,
    endTime: item.EndTime,
    organizer: item.Organizer,
    isRegular: !!item.Cycle,
    regularInfo: item.Cycle,
    parkingInfo: item.ParkingInfo,
    charge: item.Charge,
    remarks: item.Remarks,
  }));

export { parseScenicSpot, parseRestaurant, parseHotel, parseActivity };
