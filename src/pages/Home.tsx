import { useEffect } from "react";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppDispatch, useAppSelector } from "#/utils/hooks/store";
import { selectLoaded } from "#/store/slices/status";
import { queryTourismData, resetEntities } from "#/store/slices/entities";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";
import LoadingFallback from "#/components/LoadingFallback";

import { KIND } from "#/utils/constants/kind";

function Home() {
  const mounted = useMounted();
  const appDispatch = useAppDispatch();
  const loaded = useAppSelector(selectLoaded);

  useEffect(() => {
    if (!mounted) return undefined;

    appDispatch(queryTourismData());

    // cleanup
    return () => {
      appDispatch(resetEntities());
    };
  }, [mounted, appDispatch]);

  if (!loaded) return <LoadingFallback />;

  return (
    <ContentBoundary>
      {KIND.allKinds.map((kind) => (
        <EntityList key={kind} kind={kind} />
      ))}
    </ContentBoundary>
  );
}

export default Home;
