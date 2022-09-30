import { useEffect } from "react";
import { useAppDispatch } from "#/utils/hooks/store";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { queryTourismData } from "#/store/slices/entities";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";

import { KIND } from "#/utils/constants/kind";

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
      {KIND.allKinds.map((kind) => (
        <EntityList key={kind} kind={kind} />
      ))}
    </ContentBoundary>
  );
}

export default Home;
