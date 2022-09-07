import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@mui/material/Container";

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
    <Container component="main" sx={{ p: "0 1.5rem 3.5rem" }}>
      {searchKind !== "all" ? (
        <CardList kind={searchKind} />
      ) : (
        SEARCH_KIND.allKinds
          .filter<AllessSearchKind>(
            (kind): kind is AllessSearchKind => kind !== "all"
          )
          .map((kind) => <CardList key={kind} kind={kind} />)
      )}
    </Container>
  );
}

export default Search;
