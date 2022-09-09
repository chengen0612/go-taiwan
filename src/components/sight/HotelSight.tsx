import { useAppSelector } from "#/utils/hooks/store";
import { selectHotelById } from "#/store/slices/entities";

import * as S from "./styles";
import CardInfo from "#/components/entity/CardInfo";

import { AnySightProps } from "#/utils/types/sight";

function HotelSight({ entityID }: AnySightProps) {
  const hotel = useAppSelector(selectHotelById(entityID));

  const { kind, title, address, phone, description, pictures, position } =
    hotel;

  return (
    <div>
      <nav>navbar</nav>
      <S.Header>image</S.Header>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.Details>
          <CardInfo type="address" value={address} />
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

export default HotelSight;
