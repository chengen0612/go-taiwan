import { useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/system/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import type { FormEvent, ChangeEventHandler } from "react";
import type { SelectProps } from "@mui/material";

import { useAppSelector, useAppDispatch } from "#/utils/hooks/store";
import {
  selectSearchByCity,
  selectSearchByGenre,
  setSearch,
  SetSearchAction,
} from "#/store/slices/search";

import Select from "#/components/search/Select";

import { searchFormTheme } from "#/services/mui/theme";
import { CITIES, GENRES, FieldName } from "#/utils/constants/search";

function SearchForm() {
  const appDispatch = useAppDispatch();

  const handleSelectChange = useCallback<NonNullable<SelectProps["onChange"]>>(
    (event) => {
      const { name, value } = event.target as SetSearchAction["payload"];
      appDispatch(setSearch({ name, value }));
    },
    [appDispatch]
  );

  const handleQueryChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { name, value } = event.target as SetSearchAction["payload"];
      appDispatch(setSearch({ name, value }));
    },
    [appDispatch]
  );

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    const formNode = event.target as HTMLFormElement;
    const formData = new FormData(formNode);
    console.log(formData.get(FieldName.City));
    console.log(formData.get(FieldName.Genre));
    console.log(formData.get(FieldName.Query));
  }, []);

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
          <Select
            name={FieldName.City}
            value={useAppSelector(selectSearchByCity)}
            options={Object.values(CITIES)}
            onChange={handleSelectChange}
          />
          <Select
            name={FieldName.Genre}
            value={useAppSelector(selectSearchByGenre)}
            options={Object.values(GENRES)}
            onChange={handleSelectChange}
          />
          <TextField
            type="search"
            name={FieldName.Query}
            placeholder="輸入關鍵字..."
            autoComplete="off"
            inputProps={{ sx: { paddingLeft: "1.5rem" } }}
            onChange={handleQueryChange}
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
