import { getPeriod } from "#/services/tdx";

import { EntityInfo, EntityInfoType } from "#/feats/entity";
import { AnyEntity } from "#/utils/types/entity";

const switchSightDetails = (entity: AnyEntity) => {
  let info: [EntityInfoType, string | undefined][] = [];

  switch (entity.kind) {
    case "attraction":
    case "food": {
      info = [
        ["address", entity.address],
        ["time", entity.openTime],
        ["phone", entity.phone],
      ];

      break;
    }

    case "hotel": {
      info = [
        ["address", entity.address],
        ["phone", entity.phone],
      ];

      break;
    }

    case "activity": {
      const { startTime, endTime } = entity;
      const period = getPeriod(startTime, endTime);

      info = [
        ["address", entity.address],
        ["time", period],
        ["phone", entity.phone],
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
        <EntityInfo key={type} type={type} value={value} />
      ))}
    </>
  );
};

export default switchSightDetails;
