import { useCallback, FormEvent, FocusEventHandler } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "#/utils/hooks/store";
import {
  selectSearchKind,
  setSearch,
  SetSearchPayload,
} from "#/store/slices/search";
import { queryTourismData } from "#/store/slices/entities";

import SelectConnector from "#/components/search/SelectConnector";

import { SEARCH_KIND } from "#/utils/constants/searchKind";
import { SearchProperty } from "#/utils/types/search";

/* Using provider to target list component and other descendants. */
const getTheme = (outerTheme: Theme) =>
  createTheme({
    ...outerTheme,
    typography: {
      body1: { fontSize: "1rem" },
    },
  });

function SearchInput() {
  const appDispatch = useAppDispatch();

  const handleChange = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      const { name: searchProperty, value } = event.target;
      const payload = { searchProperty, value } as SetSearchPayload;

      appDispatch(setSearch(payload));
    },
    [appDispatch]
  );

  return (
    <InputBase
      type="search"
      name={SearchProperty.Keyword}
      placeholder="輸入關鍵字..."
      autoComplete="off"
      fullWidth
      onChange={handleChange}
    />
  );
}

/* Search bar for mobile devices. */
function SearchBar() {
  const appDispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      appDispatch(queryTourismData());
    },
    [appDispatch]
  );

  return (
    <ThemeProvider theme={getTheme}>
      <Box
        component="form"
        sx={{
          mx: "1.25rem",
          display: "flex",
          justifyContent: "between",
          columnGap: "0.25rem",
          borderRadius: "40px",
          px: "0.25rem",
          bgcolor: "grey.100",
          overflow: "hidden",
        }}
        onSubmit={handleSubmit}
      >
        <SelectConnector
          name={SearchProperty.Kind}
          options={SEARCH_KIND.all}
          selector={selectSearchKind}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
        <SearchInput />
        <IconButton type="submit" aria-label="search">
          <Avatar
            sx={{
              height: "2.25rem",
              width: "2.25rem",
              bgcolor: "primary.main",
            }}
          >
            <SearchIcon />
          </Avatar>
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}

export default SearchBar;
