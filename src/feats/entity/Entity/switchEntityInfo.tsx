import { getCityValue } from "#/utils/constants/city";
import { getPeriod } from "#/services/tdx/helper";

import EntityInfo, { EntityInfoType } from "#/feats/entity/EntityInfo";

import { AnyEntity } from "#/utils/types/entity";

const switchEntityInfo = (entity: AnyEntity) => {
  let info: [EntityInfoType, string | undefined][] = [];
  const cityValue = getCityValue(entity.city);

  switch (entity.kind) {
    case "attraction":
    case "food": {
      info = [
        ["city", cityValue],
        ["date", entity.openTime],
      ];

      break;
    }

    case "hotel": {
      info = [
        ["city", cityValue],
        ["address", entity.address],
      ];

      break;
    }

    case "activity": {
      const { startTime, endTime } = entity;
      const period = getPeriod(startTime, endTime);

      info = [
        ["city", cityValue],
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
        <EntityInfo key={type} type={type} value={value} />
      ))}
    </>
  );
};

export default switchEntityInfo;
