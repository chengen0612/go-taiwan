import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";

import { useMounted } from "#/utils/hooks/lifeCycle";
import { useOnSearchEnd } from "#/utils/hooks/search";

import ContentBoundary from "#/layouts/ContentBoundary";
import { EntityList } from "#/feats/entity";

import { KIND } from "#/utils/constants/kind";
import { SearchKind } from "#/store/slices/search";

function Search() {
  const [searchParams] = useSearchParams();
  // Use query string to decide which kind of data to display.
  const searchKind = searchParams.get("kind") as SearchKind;

  const mounted = useMounted();
  const onSearchEnd = useOnSearchEnd();

  // query data
  useEffect(() => {
    if (mounted) onSearchEnd();
  }, [mounted, onSearchEnd]);

  return (
    <ContentBoundary component="main">
      <Box sx={{ pb: "3.5rem" }}>
        {searchKind !== "all" ? (
          <EntityList kind={searchKind} />
        ) : (
          KIND.allKinds.map((kind) => <EntityList key={kind} kind={kind} />)
        )}
      </Box>
    </ContentBoundary>
  );
}

export default Search;
