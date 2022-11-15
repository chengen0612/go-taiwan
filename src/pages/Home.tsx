import { useEffect } from "react";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppDispatch, useAppSelector } from "#/utils/hooks/store";
import { selectStatus, resetStatus } from "#/store/slices/status";
import { loadEntities, resetEntities } from "#/store/slices/entities";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";
import PageLoadingFallback from "#/layouts/PageLoadingFallback";
import PageErrorFallback from "#/layouts/PageErrorFallback";

import { KIND } from "#/utils/constants/kind";

function Home() {
  const mounted = useMounted();
  const appDispatch = useAppDispatch();
  const { loaded, isError, error } = useAppSelector(selectStatus);

  useEffect(() => {
    if (!mounted) return undefined;

    appDispatch(loadEntities());

    // cleanup
    return () => {
      appDispatch(resetEntities());
      appDispatch(resetStatus());
    };
  }, [mounted, appDispatch]);

  if (!loaded) return <PageLoadingFallback />;
  if (isError && error) return <PageErrorFallback error={error} />;

  return (
    <ContentBoundary>
      {KIND.allKinds.map((kind) => (
        <EntityList key={kind} kind={kind} />
      ))}
    </ContentBoundary>
  );
}

export default Home;
