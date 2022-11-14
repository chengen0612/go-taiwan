import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import {
  selectSightEntity,
  selectSightRecommendations,
  loadSight,
  resetSight,
} from "#/store/slices/sight";
import { selectStatus, setError } from "#/store/slices/status";
import { useSightPathInfo } from "#/utils/hooks/pathname";
import { getCityValue } from "#/utils/constants/city";
import { getKindValue } from "#/utils/constants/kind";
import HTTPError from "#/utils/helpers/http-error";

import { S, FavoriteButton, switchSightDetails } from "#/feats/sight";
import Carousel from "#/components/Carousel";
import { Entity } from "#/feats/entity";
import LoadingFallback from "#/components/LoadingFallback";
import PageErrorFallback from "#/layouts/PageErrorFallback";

function Sight() {
  const mounted = useMounted();
  const { loaded, isError, error } = useAppSelector(selectStatus);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const entity = useAppSelector(selectSightEntity);
  const recommendations = useAppSelector(selectSightRecommendations);

  const sightPathInfo = useSightPathInfo();

  useEffect(() => {
    if (!mounted) return undefined;

    const { kind, id } = sightPathInfo;

    if (!kind || !id) {
      const { message, code } = new HTTPError(404);
      appDispatch(setError({ message, code }));
    } else {
      appDispatch(loadSight(kind, id));
    }

    // Cleanup on sight change or unmount.
    return () => {
      appDispatch(resetSight());
    };
  }, [mounted, sightPathInfo, appDispatch, navigate]);

  if (!loaded) return <LoadingFallback />;
  if (isError && error) return <PageErrorFallback error={error} />;
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
          {recommendations &&
            (recommendations.length === 0
              ? `沒有其他${getKindValue(kind)}`
              : recommendations.map((recommendation) => (
                  <Entity key={recommendation.id} entity={recommendation} />
                )))}
        </S.Recommendations>
      </S.Section>
    </S.Main>
  );
}

export default Sight;
