import { useAppSelector } from "#/utils/hooks/store";
import { selectActivityById } from "#/store/slices/entities";
import { getPeriod } from "#/services/tdx/helper";

import * as S from "./styles";
import CardInfo from "#/components/entity/CardInfo";

import { AnySightProps } from "#/utils/types/sight";

function ActivitySight({ entityID }: AnySightProps) {
  const activity = useAppSelector(selectActivityById(entityID));

  const {
    kind,
    title,
    address,
    startTime,
    endTime,
    phone,
    description,
    pictures,
    position,
  } = activity;

  const period = getPeriod(startTime, endTime);

  return (
    <div>
      <nav>navbar</nav>
      <S.Header>image</S.Header>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.Details>
          <CardInfo type="address" value={address} />
          <CardInfo type="time" value={period} />
          <CardInfo type="phone" value={phone} />
        </S.Details>
        <section>{description}</section>
        <section>position</section>
        <section>recommendation</section>
      </S.Body>
      <footer>copyright</footer>
    </div>
  );
}

export default ActivitySight;
