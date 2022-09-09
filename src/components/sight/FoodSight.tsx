import { useAppSelector } from "#/utils/hooks/store";
import { selectFoodById } from "#/store/slices/entities";

import * as S from "./styles";
import CardInfo from "#/components/entity/CardInfo";

import { AnySightProps } from "#/utils/types/sight";

function FoodSight({ entityID }: AnySightProps) {
  const food = useAppSelector(selectFoodById(entityID));

  const {
    kind,
    title,
    address,
    openTime,
    phone,
    description,
    pictures,
    position,
  } = food;

  return (
    <div>
      <nav>navbar</nav>
      <S.Header>image</S.Header>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.Details>
          <CardInfo type="address" value={address} />
          <CardInfo type="time" value={openTime} />
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

export default FoodSight;
