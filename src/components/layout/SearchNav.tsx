import { Link } from "react-router-dom";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ContentBoundary from "#/components/layout/ContentBoundary";
import SearchInput from "#/components/search/SearchInput";
import SelectKind from "#/components/search/SelectKind";
import SlideCity from "#/components/search/SlideCity";
import SearchButton from "#/components/search/SearchButton";
import { ReactComponent as Logo } from "#/assets/images/logo.svg";

const PRIMARY_COLOR = "#3a822c";

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
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "1.5rem",
            }}
          >
            {/* Logo */}
            <ButtonBase
              component={Link}
              to="/"
              disableRipple
              disableTouchRipple
              sx={{
                height: "100%",
                width: "5rem",
                display: { xs: "none", md: "block" },
              }}
            >
              <Logo height="100%" width="100%" fill={PRIMARY_COLOR} />
            </ButtonBase>
            {/* Search bar */}
            <Box
              sx={{
                flex: "1",
                display: "grid",
                gridAutoFlow: "column",
                gridTemplateColumns: "min-content auto",
                columnGap: "0.5rem",
              }}
            >
              <SelectKind />
              <SearchInput />
            </Box>
            {/* Collect button */}
            <IconButton
              aria-label="收藏"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              <FavoriteBorderIcon />
            </IconButton>
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
