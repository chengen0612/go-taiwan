import { Link } from "react-router-dom";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

import { useOnHomepageNavigate } from "#/utils/hooks/navigate";
import { PALETTE } from "#/utils/constants/theme";
import ResponsiveWrapper from "#/layouts/ResponsiveWrapper";
import {
  SelectKind,
  SearchInput,
  SlideCity,
  SearchButton,
} from "#/feats/search";
import { ReactComponent as Logo } from "#/assets/images/logo.svg";

import * as S from "./styles";
import { FavoriteButton } from "./FavoriteButton";

/* Use provider to target list component and other descendants. */
const getNavbarTheme = (outerTheme: Theme) =>
  createTheme({
    ...outerTheme,
    typography: {
      body1: { fontSize: "1rem" },
    },
  });

export function Navbar() {
  const onHomepageNavigate = useOnHomepageNavigate();

  return (
    <ThemeProvider theme={getNavbarTheme}>
      <S.Root>
        <ResponsiveWrapper sx={{ mt: "unset" }}>
          <S.UpperHalf>
            {/* Logo */}
            <ButtonBase
              component={Link}
              to="/"
              onClick={onHomepageNavigate}
              disableRipple
              disableTouchRipple
              sx={{
                height: "100%",
                width: "5rem",
                display: { xs: "none", md: "block" },
              }}
            >
              <Logo height="100%" width="100%" fill={PALETTE.primary} />
            </ButtonBase>
            {/* Search Bar */}
            <S.SearchBar>
              <SelectKind />
              <SearchInput />
            </S.SearchBar>
            {/* Favorite Button */}
            <FavoriteButton />
          </S.UpperHalf>

          <S.LowerHalf>
            <SlideCity />
            <SearchButton />
          </S.LowerHalf>
        </ResponsiveWrapper>
      </S.Root>
    </ThemeProvider>
  );
}
