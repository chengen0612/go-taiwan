// TODO:
// Update search properties and query data using parameters in the url.
// Redirect to homepage if search parameters not exist!
import Container from "@mui/material/Container";

import CardList from "#/components/entity/CardList";

import { useAppSelector } from "#/utils/hooks/store";
import { selectSearchKind } from "#/store/slices/search";

import { SEARCH_KIND, AllessSearchKind } from "#/utils/constants/searchKind";

// Get search kind from url params.
// Get entities ids by search kind.
// Decide which card component to use.

function Search() {
  const searchKind = useAppSelector(selectSearchKind);

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
