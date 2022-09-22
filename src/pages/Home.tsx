import { useEffect } from "react";
import { useAppDispatch } from "#/utils/hooks/store";

import { queryTourismData } from "#/store/slices/entities";

import SearchNav from "#/components/layout/SearchNav";
import ContentBoundary from "#/components/layout/ContentBoundary";
import CardList from "#/components/entity/CardList";

import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";

function Home() {
  const appDispatch = useAppDispatch();

  useEffect(() => appDispatch(queryTourismData()), [appDispatch]);

  return (
    <div>
      <SearchNav />
      <ContentBoundary component="main">
        {SEARCH_KIND.allKinds
          .filter<AllessSearchKind>(
            (kind): kind is AllessSearchKind => kind !== "all"
          )
          .map((kind) => (
            <CardList key={kind} kind={kind} />
          ))}
      </ContentBoundary>
    </div>
  );
}

export default Home;
