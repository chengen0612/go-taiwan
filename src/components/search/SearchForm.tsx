import { useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import type { FormEvent, ChangeEventHandler } from "react";

import { useAppDispatch } from "#/utils/hooks/store";
import { searchFormTheme } from "#/services/mui/theme";
import {
  selectSearchCity,
  selectSearchKind,
  setSearch,
  SetSearchPayload,
} from "#/store/slices/search";
import { queryTourismData } from "#/store/slices/entities";

import SelectConnector from "#/components/search/SelectConnector";

import { CITY } from "#/utils/constants/city";
import { SEARCH_KIND } from "#/utils/constants/searchKind";
import { SearchProperty } from "#/utils/types/search";

function SearchForm() {
  const appDispatch = useAppDispatch();

  const handleKeywordChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { name: searchProperty, value } = event.target;
      const payload = { searchProperty, value } as SetSearchPayload;

      appDispatch(setSearch(payload));
    },
    [appDispatch]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      // TODO:
      // Instead of query data on submit event,
      // redirect with search properties and let search page
      // handling the query
      appDispatch(queryTourismData());
    },
    [appDispatch]
  );

  return (
    <ThemeProvider theme={searchFormTheme}>
      <Box
        sx={{
          position: "relative",
          top: "76vh",
          margin: "0 2vw 9.4vh",
          height: "fit-content",
          width: "100%",
          paddingBottom: "9.4vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "common.white",
          }}
        >
          訂製你的專屬旅程
        </Typography>
        <Stack
          component="form"
          spacing={1.5}
          sx={{ marginTop: "1.25rem" }}
          onSubmit={handleSubmit}
        >
          <SelectConnector
            name={SearchProperty.City}
            options={CITY.all}
            selector={selectSearchCity}
          />
          <SelectConnector
            name={SearchProperty.Kind}
            options={SEARCH_KIND.all}
            selector={selectSearchKind}
          />
          <TextField
            type="search"
            name={SearchProperty.Keyword}
            placeholder="輸入關鍵字..."
            autoComplete="off"
            inputProps={{ sx: { paddingLeft: "1.5rem" } }}
            onChange={handleKeywordChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ fontSize: "inherit" }}
          >
            <SearchIcon sx={{ marginRight: "0.25rem", fontSize: "1.75rem" }} />
            搜尋
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default SearchForm;
