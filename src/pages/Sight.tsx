import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useMounted } from "#/utils/hooks/lifecycle";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import {
  selectSightEntity,
  selectSightRecommendations,
  queryEntity,
  queryRecommendations,
} from "#/store/slices/sight";
import { destructSightPath } from "#/utils/helpers/pathname";

import * as S from "#/components/sight/styles";
import switchSightDetails from "#/components/sight/switchSightDetails";
import Carousel from "#/components/layout/Carousel";
import { Card } from "#/components/entity/Card";
import SightNav from "#/components/layout/SightNav";

import { SEARCH_KIND } from "#/utils/constants/searchKind";
import { CITY } from "#/utils/constants/city";

function Sight() {
  const mounted = useMounted();
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const entity = useAppSelector(selectSightEntity);
  const recommendations = useAppSelector(selectSightRecommendations);

  const entityInfo = useMemo(
    () => destructSightPath(location.pathname),
    [location]
  );

  useEffect(() => {
    if (!mounted) return;

    const { kind, id } = entityInfo;

    if (!kind || !id) {
      navigate("/");
    } else {
      appDispatch(queryEntity(kind, id))
        .then(() => appDispatch(queryRecommendations()))
        .catch(() => navigate("/"));
    }
  }, [mounted, entityInfo, appDispatch, navigate]);

  if (!entity) return null;

  const { kind, city, title, description, pictures } = entity;

  return (
    <>
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
    </>
  );
}

export default Sight;
