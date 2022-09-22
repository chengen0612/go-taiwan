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
import SightNav from "#/components/layout/SightNav";

import { SEARCH_KIND } from "#/utils/constants/searchKind";
import { CITY } from "#/utils/constants/city";

function Sight() {
  const appDispatch = useAppDispatch();
  const location = useLocation();

  const { kind, city, entity, recommendations } = useAppSelector(selectSight);

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
      <SightNav />
      <S.Main>
        <S.Header>
          <Carousel pictures={pictures} />
        </S.Header>
        <S.Title>{title}</S.Title>
        <S.Details>{switchSightDetails(entity)}</S.Details>
        <S.Section>
          <S.Subtitle>{SEARCH_KIND.byIndex[kind!].value}介紹</S.Subtitle>
          <p>{description || "未提供資訊"}</p>
        </S.Section>
        <S.Section>
          <S.Subtitle>
            更多
            {CITY.byName[city!].value}
            {SEARCH_KIND.byIndex[kind!].value}
          </S.Subtitle>
          <S.Recommendations>
            {recommendations?.map((recommendation) => (
              <Card key={recommendation.id} entity={recommendation} />
            ))}
          </S.Recommendations>
        </S.Section>
      </S.Main>
    </div>
  );
}

export default Sight;
