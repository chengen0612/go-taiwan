//   -> not exist
//        - redirect to not found page
//   -> exist
//        - render
//        - get recommend items by location or search options

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { selectSight, queryRecommendations } from "#/store/slices/sight";

import * as S from "#/components/sight/styles";
import switchSightDetails from "#/components/sight/switchSightDetails";
import Carousel from "#/components/layout/Carousel";
import { Card } from "#/components/entity/Card";

function Sight() {
  const appDispatch = useAppDispatch();
  const location = useLocation();

  const { entity, recommendations } = useAppSelector(selectSight);

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
        <S.Details>{switchSightDetails(entity)}</S.Details>
        {/* TODO: add fallback if no content */}
        <section>{description}</section>
        {recommendations?.map((recommendation) => (
          <Card key={recommendation.id} entity={recommendation} />
        ))}
      </S.Body>
      <footer>copyright</footer>
    </div>
  );
}

export default Sight;
