import { getPeriod } from "#/services/tdx/helper";

import CardInfo, { EntityInfoType } from "./CardInfo";

import {
  ScenicSpotEntity,
  RestaurantEntity,
  HotelEntity,
  ActivityEntity,
} from "#/utils/types/entity";

type Entity =
  | ScenicSpotEntity
  | RestaurantEntity
  | HotelEntity
  | ActivityEntity;

const switchCardInfo = (entity: Entity) => {
  let info: [EntityInfoType, string | undefined][] = [];

  switch (entity.kind) {
    case "attraction":
    case "food": {
      info = [
        ["city", entity.city],
        ["date", entity.openTime],
      ];

      break;
    }

    case "hotel": {
      info = [
        ["city", entity.city],
        ["address", entity.address],
      ];

      break;
    }

    case "activity": {
      const { startTime, endTime } = entity;
      const period = getPeriod(startTime, endTime);

      info = [
        ["city", entity.city],
        ["date", period],
      ];

      break;
    }

    default: {
      // eslint-disable-next-line no-underscore-dangle
      const _exhaustedCheck: never = entity;

      return _exhaustedCheck;
    }
  }

  return (
    <>
      {info.map(([type, value]) => (
        <CardInfo key={type} type={type} value={value} />
      ))}
    </>
  );
};

export default switchCardInfo;
