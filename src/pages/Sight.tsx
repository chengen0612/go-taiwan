import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import {
  selectSightEntity,
  selectSightRecommendations,
  queryEntity,
  queryRecommendations,
} from "#/store/slices/sight";
import { destructSightPath } from "#/utils/helpers/pathname";
import { getCityValue } from "#/utils/constants/city";

import { S, FavoriteButton, switchSightDetails } from "#/feats/sight";
import Carousel from "#/components/Carousel";
import { Entity } from "#/feats/entity";

import { KIND } from "#/utils/constants/kind";

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

  const { kind, id, city, title, description, pictures } = entity;

  return (
    <S.Main>
      <S.Header>
        <Carousel key={id} pictures={pictures} />
      </S.Header>
      <S.Heading>
        <S.Title>{title}</S.Title>
        <FavoriteButton entity={entity} />
      </S.Heading>
      <S.Details>{switchSightDetails(entity)}</S.Details>
      <S.Section>
        <S.Subtitle>{KIND.byKind[kind!].value}介紹</S.Subtitle>
        <p>{description || "未提供資訊"}</p>
      </S.Section>
      <S.Section>
        <S.Subtitle>
          更多
          {getCityValue(city)}
          {KIND.byKind[kind!].value}
        </S.Subtitle>
        <S.Recommendations>
          {recommendations?.map((recommendation) => (
            <Entity key={recommendation.id} entity={recommendation} />
          ))}
        </S.Recommendations>
      </S.Section>
    </S.Main>
  );
}

export default Sight;
