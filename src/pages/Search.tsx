import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";

import SearchNav from "#/components/layout/SearchNav";
import ContentBoundary from "#/components/layout/ContentBoundary";
import CardList from "#/components/entity/CardList";

import { useOnSearchEnd } from "#/utils/hooks/search";

import {
  SEARCH_KIND,
  SearchKind,
  AllessSearchKind,
} from "#/utils/constants/searchKind";

function Search() {
  const [searchParams] = useSearchParams();
  // Using query string to decide which kind of data to display.
  const searchKind = searchParams.get("kind") as SearchKind;

  const onSearchEnd = useOnSearchEnd();

  const [didMount, setDidMount] = useState(false);

  useEffect(() => setDidMount(true), []);

  // Query data.
  useEffect(() => {
    if (didMount) onSearchEnd();
  }, [didMount, onSearchEnd]);

  return (
    <>
      <SearchNav />
      <ContentBoundary component="main">
        <Box sx={{ pb: "3.5rem" }}>
          {searchKind !== "all" ? (
            <CardList kind={searchKind} />
          ) : (
            SEARCH_KIND.allKinds
              .filter<AllessSearchKind>(
                (kind): kind is AllessSearchKind => kind !== "all"
              )
              .map((kind) => <CardList key={kind} kind={kind} />)
          )}
        </Box>
      </ContentBoundary>
    </>
  );
}

export default Search;
