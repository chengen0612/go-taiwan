/* PictureUrl might have no description. */
export interface TDXPicture {
  PictureUrl1?: string;
  PictureUrl2?: string;
  PictureUrl3?: string;
  PictureDescription1?: string;
  PictureDescription2?: string;
  PictureDescription3?: string;
}

export interface TDXPosition {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}

export interface AnyTDXItem {
  Address?: string /* The location name with detail compared to TDXActivity 'Location' property  */;
  City: string;
  Description?: string /* A shortened description compared to TDXScenicSpot 'DescriptionDetail' property */;
  Phone?: string;
  Picture: TDXPicture;
  Position: TDXPosition;
  WebsiteUrl?: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export interface TDXScenicSpot extends AnyTDXItem {
  ScenicSpotID: string;
  ScenicSpotName: string;
  DescriptionDetail?: string;
  OpenTime?: string; // unformatted data
  Class1?: string; // tagname
  Class2?: string; // tagname
  Class3?: string; // tagname
}

export interface TDXRestaurant extends AnyTDXItem {
  RestaurantID: string;
  RestaurantName: string;
  OpenTime?: string;
  Class?: string; // tagname
}

export interface TDXHotel extends AnyTDXItem {
  HotelID: string;
  HotelName: string;
  Class?: string; // tagname
  ParkingInfo?: string;
}

// <strong>{Cycle}</strong> StartTime - EndTime || 未提供資訊
export interface TDXActivity extends AnyTDXItem {
  ActivityID: string;
  ActivityName: string;
  Location: string; // venue
  Organizer: string;
  StartTime: string;
  EndTime: string;
  Cycle?: string /* The property itself is a flag that represent the regular event,
  it provide extra information about open time. */;
  Class1?: string; // tagname
  Class2?: string; // tagname
  TravelInfo?: string; // how to arrive?
  ParkingInfo?: string;
  Charge?: string;
  Remarks?: string;
}
