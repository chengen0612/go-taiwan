//   -> not exist
//        - redirect to not found page
//   -> exist
//        - render
//        - get recommend items by location or search options

import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { selectSearchCity } from "#/store/slices/search";
import {
  selectSight,
  setEntity,
  SetEntityPayload,
  queryRecommendations,
} from "#/store/slices/sight";

import * as S from "#/components/sight/styles";
import switchDetails from "#/components/sight/switchDetails";
import Carousel from "#/components/layout/Carousel";
import { CardBase, switchCardInfo } from "#/components/entity/Card";

function Sight() {
  const appDispatch = useAppDispatch();
  const location = useLocation();

  const { entity, recommendations } = useAppSelector(selectSight);
  const city = useAppSelector(selectSearchCity);

  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (entity: SetEntityPayload["entity"]) => {
      appDispatch(setEntity({ entity, city }));
    },
    [appDispatch, city]
  );

  useEffect(() => {
    appDispatch(queryRecommendations());
  }, [appDispatch, location]);

  if (!entity) {
    // TODO:
    //   | Redirect to not found page.
    //   | Show cannot find message.
    return null;
  }

  const { title, description, pictures } = entity;

  return (
    <div>
      <nav>navbar</nav>
      <S.Header>
        <Carousel pictures={pictures} />
      </S.Header>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.Details>{switchDetails(entity)}</S.Details>
        {/* TODO: add fallback if no content */}
        <section>{description}</section>
        {recommendations?.map((recommendation) => (
          <CardBase
            key={recommendation.id}
            entity={recommendation}
            onClick={() => handleClick(recommendation)}
          >
            {switchCardInfo(recommendation)}
          </CardBase>
        ))}
      </S.Body>
      <footer>copyright</footer>
    </div>
  );
}

export default Sight;
