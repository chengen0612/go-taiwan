import { getPeriod } from "#/services/tdx";
import { getCityValue } from "#/utils/constants/city";
import type { AnyEntity } from "#/utils/models/entity";
import IconPrefixText, {
  IconPrefixTextProps,
} from "#/components/IconPrefixText";

export const switchEntityInfo = (entity: AnyEntity) => {
  let info: [IconPrefixTextProps["type"], string | undefined][] = [];
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
        <IconPrefixText
          key={type}
          type={type}
          value={value || "無資訊"}
          clamp={2}
        />
      ))}
    </>
  );
};
