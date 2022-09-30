import { useEffect } from "react";
import { useAppDispatch } from "#/utils/hooks/store";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { queryTourismData } from "#/store/slices/entities";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";

import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";

function Home() {
  const mounted = useMounted();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (mounted) {
      appDispatch(queryTourismData());
    }
  }, [mounted, appDispatch]);

  return (
    <ContentBoundary component="main">
      {SEARCH_KIND.allKinds
        .filter<AllessSearchKind>(
          (kind): kind is AllessSearchKind => kind !== "all"
        )
        .map((kind) => (
          <EntityList key={kind} kind={kind} />
        ))}
    </ContentBoundary>
  );
}

export default Home;
