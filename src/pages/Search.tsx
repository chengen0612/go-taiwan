import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useOnSearchEnd } from "#/utils/hooks/search";
import { useAppDispatch, useAppSelector } from "#/utils/hooks/store";
import { resetEntities } from "#/store/slices/entities";
import { selectStatus, resetStatus } from "#/store/slices/status";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";
import PageLoadingFallback from "#/layouts/PageLoadingFallback";
import PageErrorFallback from "#/layouts/PageErrorFallback";

import { KIND } from "#/utils/constants/kind";
import { SearchKind } from "#/store/slices/search";

function Search() {
  const [searchParams] = useSearchParams();
  // Use query string to decide which kind of data to display.
  const searchKind = searchParams.get("kind") as SearchKind;

  const mounted = useMounted();
  const onSearchEnd = useOnSearchEnd();
  const appDispatch = useAppDispatch();
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
    <ContentBoundary>
      {searchKind !== "all" ? (
        <EntityList kind={searchKind} />
      ) : (
        KIND.allKinds.map((kind) => <EntityList key={kind} kind={kind} />)
      )}
    </ContentBoundary>
  );
}

export default Search;
