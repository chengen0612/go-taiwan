import { useEffect } from "react";

import { resetEntities } from "#/store/slices/entities";
import { selectStatus, resetStatus } from "#/store/slices/status";
import { useAppDispatch, useAppSelector } from "#/utils/hooks/store";
import { useMounted } from "#/utils/hooks/lifeCycle";
import { KIND } from "#/utils/constants/kind";
import ResponsiveWrapper from "#/layouts/ResponsiveWrapper";
import PageLoadingFallback from "#/layouts/PageLoadingFallback";
import PageErrorFallback from "#/layouts/PageErrorFallback";
import { EntityList } from "#/feats/entity";
import { useSearchPath, useOnSearchEnd } from "#/feats/search";

function Search() {
  const appDispatch = useAppDispatch();
  const mounted = useMounted();
  // Display data based on the kind parameter set in the query string.
  const { kind: searchKind } = useSearchPath();
  const onSearchEnd = useOnSearchEnd();
  const { loaded, isError, error } = useAppSelector(selectStatus);

  useEffect(() => {
    if (!mounted) return undefined;

    // query data
    onSearchEnd();

    // Reset on querystring change or unmount.
    return () => {
      appDispatch(resetEntities());
      appDispatch(resetStatus());
    };
  }, [mounted, onSearchEnd, appDispatch]);

  if (!loaded) return <PageLoadingFallback />;
  if (isError && error) return <PageErrorFallback error={error} />;

  return (
    <ResponsiveWrapper>
      {searchKind !== "all" ? (
        <EntityList kind={searchKind} />
      ) : (
        KIND.allKinds.map((kind) => <EntityList key={kind} kind={kind} />)
      )}
    </ResponsiveWrapper>
  );
}

export default Search;
