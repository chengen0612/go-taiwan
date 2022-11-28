import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  selectSightEntity,
  selectSightRecommendations,
  loadSight,
  resetSight,
} from "#/store/slices/sight";
import { selectStatus, setError, resetStatus } from "#/store/slices/status";
import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import { useSightPathInfo } from "#/utils/hooks/pathname";
import HTTPError from "#/utils/helpers/http-error";
import ResponsiveWrapper from "#/layouts/ResponsiveWrapper";
import PageLoadingFallback from "#/layouts/PageLoadingFallback";
import PageErrorFallback from "#/layouts/PageErrorFallback";
import { Header, Introduction, Recommendations } from "#/feats/sight";

function Sight() {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const mounted = useMounted();
  const sightPathInfo = useSightPathInfo();

  const { loaded, isError, error } = useAppSelector(selectStatus);
  const entity = useAppSelector(selectSightEntity);
  const recommendations = useAppSelector(selectSightRecommendations);

  useEffect(() => {
    if (!mounted) return undefined;

    const { kind, id } = sightPathInfo;

    if (!kind || !id) {
      const { code, message } = new HTTPError(404);
      appDispatch(setError({ code, message }));
    } else {
      appDispatch(loadSight(kind, id));
    }

    // Reset on sight change or unmount.
    return () => {
      appDispatch(resetSight());
      appDispatch(resetStatus());
    };
  }, [mounted, sightPathInfo, appDispatch, navigate]);

  if (!loaded) return <PageLoadingFallback />;
  if (isError && error) return <PageErrorFallback error={error} />;
  // If any of the following variables are undefined, the request may have failed.
  if (!entity || !recommendations) return null;

  const { id, kind, city, pictures } = entity;

  return (
    <ResponsiveWrapper
      maxWidth="md"
      sx={{ display: "grid", rowGap: "1.75rem" }}
    >
      <Header key={id} pictures={pictures} />
      <Introduction entity={entity} />
      <Recommendations kind={kind} city={city} entities={recommendations} />
    </ResponsiveWrapper>
  );
}

export default Sight;
