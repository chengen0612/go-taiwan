import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useOnSearchEnd } from "#/utils/hooks/search";
import { useAppDispatch, useAppSelector } from "#/utils/hooks/store";
import { resetEntities } from "#/store/slices/entities";
import { selectLoaded } from "#/store/slices/status";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";
import LoadingFallback from "#/components/LoadingFallback";

import { KIND } from "#/utils/constants/kind";
import { SearchKind } from "#/store/slices/search";

function Search() {
  const [searchParams] = useSearchParams();
  // Use query string to decide which kind of data to display.
  const searchKind = searchParams.get("kind") as SearchKind;

  const mounted = useMounted();
  const onSearchEnd = useOnSearchEnd();
  const appDispatch = useAppDispatch();
  const loaded = useAppSelector(selectLoaded);

  useEffect(() => {
    if (!mounted) return undefined;

    // query data
    onSearchEnd();

    // Cleanup on querystring change or unmount.
    return () => {
      appDispatch(resetEntities());
    };
  }, [mounted, onSearchEnd, appDispatch]);

  if (!loaded) return <LoadingFallback />;

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
