import Box from "@mui/material/Box";

import ContentBoundary from "#/components/layout/ContentBoundary";
import SearchBar from "#/components/search/SearchBar";
import SlideCity from "#/components/search/SlideCity";

function SearchNav() {
  return (
    <Box
      component="nav"
      sx={{
        pt: "1rem",
        bgcolor: "common.white",
        boxShadow:
          "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
      }}
    >
      <ContentBoundary>
        <SearchBar />
        <SlideCity />
      </ContentBoundary>
    </Box>
  );
}

export default SearchNav;
