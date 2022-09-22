import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";

import ContentBoundary from "#/components/layout/ContentBoundary";
import SearchInput from "#/components/search/SearchInput";
import SelectKind from "#/components/search/SelectKind";
import SlideCity from "#/components/search/SlideCity";
import SearchButton from "#/components/search/SearchButton";

/* Use provider to target list component and other descendants. */
const getNavTheme = (outerTheme: Theme) =>
  createTheme({
    ...outerTheme,
    typography: {
      body1: { fontSize: "1rem" },
    },
  });

function SearchNav() {
  return (
    <ThemeProvider theme={getNavTheme}>
      <Container
        component="nav"
        sx={{
          pt: "1rem",
          bgcolor: "common.white",
          boxShadow:
            "0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16)",
        }}
      >
        <ContentBoundary>
          <Box
            sx={{
              height: "3.25rem",
              display: "flex",
              justifyContent: "center",
              columnGap: "0.75rem",
            }}
          >
            <SelectKind />
            <SearchInput />
          </Box>
          <Box
            sx={{
              height: "4rem",
              display: "flex",
              columnGap: "0.75rem",
            }}
          >
            <SlideCity />
            <SearchButton />
          </Box>
        </ContentBoundary>
      </Container>
    </ThemeProvider>
  );
}

export default SearchNav;
