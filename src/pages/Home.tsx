import { useEffect } from "react";

import { selectStatus, resetStatus } from "#/store/slices/status";
import { loadEntities, resetEntities } from "#/store/slices/entities";
import { useMounted } from "#/utils/hooks/lifeCycle";
import { useAppDispatch, useAppSelector } from "#/utils/hooks/store";
import { KIND } from "#/utils/constants/kind";
import ResponsiveWrapper from "#/layouts/ResponsiveWrapper";
import PageLoadingFallback from "#/layouts/PageLoadingFallback";
import PageErrorFallback from "#/layouts/PageErrorFallback";
import { EntityList } from "#/feats/entity";

function Home() {
  const appDispatch = useAppDispatch();
  const mounted = useMounted();

  const { loaded, isError, error } = useAppSelector(selectStatus);

  useEffect(() => {
    if (!mounted) return undefined;

    appDispatch(loadEntities());

    // Reset on unmount.
    return () => {
      appDispatch(resetEntities());
      appDispatch(resetStatus());
    };
  }, [mounted, appDispatch]);

  if (!loaded) return <PageLoadingFallback />;
  if (isError && error) return <PageErrorFallback error={error} />;

  return (
    <ResponsiveWrapper>
      {KIND.allKinds.map((kind) => (
        <EntityList key={kind} kind={kind} />
      ))}
    </ResponsiveWrapper>
  );
}

export default Home;
