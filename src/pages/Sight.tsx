import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import {
  selectSightEntity,
  selectSightRecommendations,
  queryEntity,
  queryRecommendations,
  resetSight,
} from "#/store/slices/sight";
import { useSightPathInfo } from "#/utils/hooks/pathname";
import { getCityValue } from "#/utils/constants/city";
import { getKindValue } from "#/utils/constants/kind";

import { S, FavoriteButton, switchSightDetails } from "#/feats/sight";
import Carousel from "#/components/Carousel";
import { Entity } from "#/feats/entity";

function Sight() {
  const mounted = useMounted();
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const entity = useAppSelector(selectSightEntity);
  const recommendations = useAppSelector(selectSightRecommendations);

  const sightPathInfo = useSightPathInfo();

  useEffect(() => {
    if (!mounted) return undefined;

    const { kind, id } = sightPathInfo;

    if (!kind || !id) {
      // Improve inspection of kind and id
      navigate("/");
    } else {
      appDispatch(queryEntity(kind, id))
        .then(() => appDispatch(queryRecommendations()))
        .catch(() => navigate("/"));
    }

    // Cleanup on sight change or unmount.
    return () => {
      appDispatch(resetSight());
    };
  }, [mounted, sightPathInfo, appDispatch, navigate]);

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
        <S.Subtitle>{getKindValue(kind)}介紹</S.Subtitle>
        <p>{description || "未提供資訊"}</p>
      </S.Section>
      <S.Section>
        <S.Subtitle>
          更多
          {getCityValue(city)}
          {getKindValue(kind)}
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
