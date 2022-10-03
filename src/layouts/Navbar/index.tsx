import { Link } from "react-router-dom";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

import { useOnHome } from "#/utils/hooks/navigate";

import * as S from "./styles";
import ContentBoundary from "#/layouts/ContentBoundary";
import {
  SelectKind,
  SearchInput,
  SlideCity,
  SearchButton,
} from "#/feats/search";
import FavoriteButton from "./FavoriteButton";
import { ReactComponent as Logo } from "#/assets/images/logo.svg";

const PRIMARY_COLOR = "#3a822c";

/* Use provider to target list component and other descendants. */
const getNavbarTheme = (outerTheme: Theme) =>
  createTheme({
    ...outerTheme,
    typography: {
      body1: { fontSize: "1rem" },
    },
  });

function Navbar() {
  const onHome = useOnHome();

  return (
    <ThemeProvider theme={getNavbarTheme}>
      <S.Root>
        <ContentBoundary>
          <S.UpperHalf>
            {/* Logo */}
            <ButtonBase
              component={Link}
              to="/"
              disableRipple
              disableTouchRipple
              onClick={onHome}
              sx={{
                height: "100%",
                width: "5rem",
                display: { xs: "none", md: "block" },
              }}
            >
              <Logo height="100%" width="100%" fill={PRIMARY_COLOR} />
            </ButtonBase>

            {/* Search bar */}
            <S.SearchBar>
              <SelectKind />
              <SearchInput />
            </S.SearchBar>

            {/* Favorite button */}
            <FavoriteButton />
          </S.UpperHalf>

          <S.LowerHalf>
            <SlideCity />
            <SearchButton />
          </S.LowerHalf>
        </ContentBoundary>
      </S.Root>
    </ThemeProvider>
  );
}

export default Navbar;
